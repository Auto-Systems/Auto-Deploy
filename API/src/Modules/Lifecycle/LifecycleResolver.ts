// API/src/Modules/Lifecycle/LifecycleResolver.ts
import { config } from 'API/config';
import {
  decodeENV,
  parseConfigurationFile,
  processCopyDirs,
  processCopyFiles,
  processEXEC,
  processInstall,
} from 'API/Configuration/parseConfigurationFile';
import { AuthContext } from 'API/Context';
import { sign } from 'jsonwebtoken';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { ManagedNode } from '../Controllers/ManagedNodes/ManagedNodeModel';
import { UserPermission } from '../Controllers/ManagedNodes/ManagedNodePermissionModel';
import {
  initialProvisionNode,
  ProvisionTypes,
} from '../Provisioners/Actions/initialProvision';
import { LifecycleConfig } from './LifecycleEnvironmentModel';
import { Lifecycle } from './LifecycleModel';

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
  async lsFiles(
    @Arg('IP') ip: string,
    @Arg('IP2') ip2: string,
    @Arg('path') path: string,
    @Arg('path2') path2: string,
    @Ctx()
    {
      controller: controllerContext,
      provisioner: provisionerContext,
      currentUser,
    }: AuthContext,
  ): Promise<boolean> {
    await processCopyDirs({ sourceHost: ip, destHost: ip2 }, [
      { from: path, to: path2 },
    ]);

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
      currentUser,
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

    await managedNode.getUserPermitted(currentUser, UserPermission.ADMIN);

    console.log(managedNode, lifecycle);

    const newNode = await controller.createNode({
      ...managedNode,
      name: `${managedNode.name}-test`,
      coreTemplate: managedNode.coreTemplate.itemID,
    });

    console.log(newNode);

    await initialProvisionNode({
      controller: controllerContext,
      provisioner: provisionerContext,
      type: ProvisionTypes.TEST,
      node: newNode.id,
      coreTemplateId: managedNode.coreTemplate.id,
    });

    console.log('Provisioining complete');

    const result = await controller.getNodeInfo(newNode.id);

    await provisioner.loadKeys();
    await provisioner.initProvisioner(result.network.host);

    const base64 = lifecycle.file.replace(/data:.*;base64,/, '');

    const configFile = Buffer.from(base64, 'base64');
    const configuration = parseConfigurationFile(configFile.toString());

    const currentProdInfo = await controller.getNodeInfo(managedNode.node);

    console.log(currentProdInfo);

    if (configuration.copyFiles.length > 0)
      processCopyFiles(
        {
          sourceHost: currentProdInfo.network.host,
          destHost: result.network.host,
        },
        configuration.copyFiles,
      );
    if (configuration.copyDirs.length > 0)
      await processCopyDirs(
        {
          sourceHost: currentProdInfo.network.host,
          destHost: result.network.host,
        },
        configuration.copyDirs,
      );
    if (configuration.install.length > 0)
      await processInstall(result.network.host, configuration.install);
    if (configuration.exec && configuration.exec.length > 0)
      await processEXEC(
        result.network.host,
        configuration.exec,
        nodeId,
        decodeENV(lifecycle.config),
      );

    return 'helloTest';
  }
}
