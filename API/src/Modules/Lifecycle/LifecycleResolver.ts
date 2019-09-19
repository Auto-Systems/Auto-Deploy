// API/src/Modules/Lifecycle/LifecycleResolver.ts
import {
  parseConfigurationFile,
  processCopyFiles,
  processEXEC,
  processInstall,
  decodeENV,
} from 'API/Configuration/parseConfigurationFile';
import { AuthContext } from 'API/Context';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  ForbiddenError,
} from 'type-graphql';
import { ManagedNode } from '../Controllers/ManagedNodes/ManagedNodeModel';
import {
  initialProvisionNode,
  ProvisionTypes,
} from '../Provisioners/Actions/initialProvision';
import { LifecycleConfig } from './LifecycleEnvironmentModel';
import { Lifecycle } from './LifecycleModel';
import { sign } from 'jsonwebtoken';
import { config } from 'API/config';
import { UserPermission } from '../Controllers/ManagedNodes/ManagedNodePermissionModel';

@InputType()
class LCENV {
  @Field()
  key: string;

  @Field()
  value: string;
}

@InputType()
class CreateLifecycleInput {
  @Field()
  nodeId: string;

  @Field(() => [LCENV])
  env: LCENV[];

  @Field()
  file: string;
}

const envRegex = /\$\{(_.*)\}/;
let envTester = 'curl ${_GITHUB_TOKEN}';

@Resolver()
export class LifecycleResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async createLifecycle(
    @Arg('input') input: CreateLifecycleInput,
  ): Promise<boolean> {
    const newlc = await Lifecycle.create({
      nodeId: input.nodeId,
      file: input.file,
      config: [],
    }).save();
    for (const { key, value } of input.env)
      newlc.config.push(
        await LifecycleConfig.create({
          key,
          value: sign(value, config.secretKey),
        }).save(),
      );
    await newlc.save();
    return true;
  }

  @Authorized()
  @Query(() => Boolean)
  async testConfig(@Arg('id') id: string): Promise<boolean> {
    const test = await Lifecycle.findOneOrFail({
      where: { nodeId: id },
      relations: ['config'],
    });
    const test2 = envRegex.exec(envTester)![1];
    test.config.map(({ key, value }) => {
      if (envTester.includes(`\$\{${key}\}`))
        envTester = envTester.replace(`\$\{${key}\}`, value);
    });
    console.log(envTester);
    console.log(test2);
    console.log(test.config);
    return true;
  }

  @Authorized()
  @Mutation(() => String)
  async startLifecycle(
    @Arg('nodeId') nodeId: string,
    @Ctx()
    {
      controller: controllerContext,
      provisioner: provisionerContext,
      currentUser
    }: AuthContext,
  ): Promise<string> {
    const { controller } = controllerContext;
    const { provisioner } = provisionerContext;
    const [lifecycle, managedNode] = await Promise.all([
      Lifecycle.findOneOrFail({ where: { nodeId }, relations: ['config'] }),
      ManagedNode.findOneOrFail(nodeId, {
        relations: ['coreTemplate', 'nodePermissions'],
      }),
    ]);

    const userNodePermission = managedNode.nodePermissions.find(({ userId }) => userId === currentUser.id)
    if (!userNodePermission || !userNodePermission.userPermission.includes(UserPermission.ADMIN)) throw new ForbiddenError()

    console.log(managedNode, lifecycle)

    const newNode = await controller.createNode({
      ...managedNode,
      name: `${managedNode.name}-test`,
      coreTemplate: managedNode.coreTemplate.itemID,
    });

    console.log(newNode)

    await initialProvisionNode({
      controller: controllerContext,
      provisioner: provisionerContext,
      type: ProvisionTypes.TEST,
      node: newNode.id,
      coreTemplateId: managedNode.coreTemplate.id,
    });


    const result = await controller.getNodeInfo(newNode.id);

    console.log(result)

    await provisioner.loadKeys();
    await provisioner.initProvisioner(result.network.host);

    const base64 = lifecycle.file.replace(/data:.*;base64,/, '');

    const configFile = Buffer.from(base64, 'base64');
    const configuration = parseConfigurationFile(configFile.toString());

    const currentProdInfo = await controller.getNodeInfo(managedNode.node);

    if (configuration.copyFiles.length > 0)
      await Promise.all(
        configuration.copyFiles.map((copy) =>
          processCopyFiles(
            {
              sourceHost: currentProdInfo.network.host,
              destHost: result.network.host,
            },
            copy,
          ),
        ),
      );
    if (configuration.install.length > 0)
      await processInstall(result.network.host, configuration.install);
    if (configuration.exec && configuration.exec.length > 0)
      await processEXEC(
        result.network.host,
        configuration.exec,
        decodeENV(lifecycle.config),
      );

    return 'helloTest';
  }
}
