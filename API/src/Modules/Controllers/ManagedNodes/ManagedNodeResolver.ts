// API/src/Modules/Controllers/ManagedNodes/ManagedNodesResolver.ts
import { AuthContext } from 'API/Context';
import {
  Arg,
  ArgumentValidationError,
  Authorized,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { CoreTemplate } from '../CoreTemplates/CoreTemplateModel';
import { CreateNodeInput } from './CreateNodeInput';
import { ManagedNode } from './ManagedNodeModel';
import {
  ManagedNodePermission,
  UserPermission,
} from './ManagedNodePermissionModel';
import { NodeRequest } from './NodeRequestModel';
import { ApproveNodeRequestInput } from './ApproveNodeRequestInput';
import {
  initialProvisionNode,
  ProvisionTypes,
} from 'API/Modules/Provisioners/Actions/initialProvision';
import {
  parseConfigurationFile,
  processInstall,
  processEXEC,
} from 'API/Configuration/parseConfigurationFile';
import { ApolloError } from 'apollo-server-koa';

@Resolver(() => ManagedNode)
export class ManagedNodeResovler {
  @Authorized(['Admin'])
  @Query(() => [ManagedNode])
  async getAllManagedNodes(@Ctx() { controller: { record } }: AuthContext): Promise<ManagedNode[]> {
    return ManagedNode.find({ relations: ['coreTemplate'], where: { controllerId: record.id } });
  }

  @Authorized()
  @Query(() => [ManagedNode])
  async managedNodes(@Ctx() { currentUser }: AuthContext): Promise<ManagedNode[]> {
    const nodes: ManagedNode[] = []
    for (const nodePermission of await currentUser.nodePermissions) nodes.push(await nodePermission.managedNode)
    return nodes
  }

  @FieldResolver(() => String)
  helloWorld(@Root() root: ManagedNode): string {
    console.log(root);
    return 'helloWorld';
  }

  @Authorized(['Admin'])
  @Mutation(() => ManagedNode)
  public async createNode(
    @Arg('input') { coreTemplate, ...input }: CreateNodeInput,
    @Ctx() { controller: { controller, record }, currentUser }: AuthContext,
  ): Promise<ManagedNode> {
    const template = await CoreTemplate.findOne({ id: coreTemplate });
    if (!template)
      throw new ArgumentValidationError([
        {
          property: 'coreTemplate',
          constraints: {
            isValid: 'Invalid coreTemplate',
          },
          children: [],
        },
      ]);

    const newNode = await controller.createNode({
      ...input,
      coreTemplate: template.itemID,
    });

    const newManagedNode = await ManagedNode.create({
      ...input,
      name: newNode.name,
      coreTemplateId: template.id,
      controllerId: record.id,
      node: newNode.id,
      nodePermissions: [],
    }).save();

    newManagedNode.nodePermissions.push(
      await ManagedNodePermission.create({
        managedNodeId: newManagedNode.id,
        userId: currentUser.id,
        userPermission: [
          UserPermission.READ,
          UserPermission.WRITE,
          UserPermission.ADMIN,
        ],
      }).save(),
    );

    return newManagedNode;
  }

  @Authorized(['Admin'])
  @Mutation(() => ManagedNode)
  async approveNodeRequest(
    @Arg('requestId') requestId: string,
    @Arg('input') input: ApproveNodeRequestInput,
    @Ctx()
    {
      controller: controllerContext,
      provisioner: provisionerContext,
    }: AuthContext,
  ): Promise<ManagedNode> {
    const { controller, record } = controllerContext;
    // const { provisioner } = provisionerContext
    const nodeRequest = await NodeRequest.findOneOrFail(requestId, { relations: ['config'] });
    const coreTemplate = await CoreTemplate.findOneOrFail({
      where: { os: nodeRequest.os },
    });

    const newNode = await controller.createNode({
      name: `${nodeRequest.name}-prod`,
      coreTemplate: coreTemplate.itemID,
      ...input,
    });

    const newManagedNode = await ManagedNode.create({
      ...input,
      name: newNode.name,
      coreTemplateId: coreTemplate.id,
      controllerId: record.id,
      node: newNode.id,
      nodePermissions: [],
    }).save();

    newManagedNode.nodePermissions.push(
      await ManagedNodePermission.create({
        managedNodeId: newManagedNode.id,
        userId: nodeRequest.userId,
        userPermission: [
          UserPermission.READ,
          UserPermission.WRITE,
          UserPermission.ADMIN,
        ],
      }).save(),
    );

    await newManagedNode.save();

    await initialProvisionNode({
      controller: controllerContext,
      provisioner: provisionerContext,
      node: newManagedNode.node,
      coreTemplateId: newManagedNode.coreTemplateId,
      type: ProvisionTypes.PROD,
    });

    console.log(nodeRequest)

    if (nodeRequest.configurationFile) {
      const base64 = nodeRequest.configurationFile.replace(
        /data:.*;base64,/,
        '',
      );

      const configFile = Buffer.from(base64, 'base64');
      const configuration = parseConfigurationFile(configFile.toString());

      if (
        configuration.copyDirs.length > 0 ||
        configuration.copyFiles.length > 0
      )
        throw new ApolloError(`Initial Configuration can't contain COPY`);

      const { network } = await controller.getNodeInfo(newManagedNode.node);

      if (configuration.install.length > 0)
        await processInstall(network.host, configuration.install);

      if (configuration.exec && configuration.exec.length > 0)
        await processEXEC(network.host, configuration.exec, nodeRequest.config);
    }

    return newManagedNode;
  }
}
