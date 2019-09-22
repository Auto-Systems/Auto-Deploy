// API/src/Modules/Controllers/ManagedNodes/ManagedNodesResolver.ts
import {
  parseConfigurationFile,
  processEXEC,
  processInstall,
} from 'API/Configuration/parseConfigurationFile';
import { AuthContext } from 'API/Context';
import {
  initialProvisionNode,
  ProvisionTypes,
} from 'API/Modules/Provisioners/Actions/initialProvision';
import { ApolloError } from 'apollo-server-koa';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { ApproveNodeRequestInput } from './ApproveNodeRequestInput';
import { ManagedNode } from './ManagedNodeModel';
import {
  ManagedNodePermission,
  UserPermission,
} from './ManagedNodePermissionModel';
import { NodeRequest, NodeRequestState } from './NodeRequestModel';

@Resolver(() => ManagedNode)
export class ManagedNodeResovler {
  @Authorized(['Admin'])
  @Query(() => [ManagedNode])
  async getAllManagedNodes(@Ctx()
  {
    controller: { record },
  }: AuthContext): Promise<ManagedNode[]> {
    return ManagedNode.find({
      relations: ['coreTemplate'],
      where: { controllerId: record.id },
    });
  }

  @Authorized()
  @Query(() => [ManagedNode])
  async managedNodes(@Ctx() { currentUser }: AuthContext): Promise<
    ManagedNode[]
  > {
    const nodes: ManagedNode[] = [];
    for (const nodePermission of await currentUser.nodePermissions)
      nodes.push(nodePermission.managedNode);
    return nodes;
  }

  @Authorized()
  @Query(() => ManagedNode)
  async managedNode(
    @Arg('nodeId') nodeId: string,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<ManagedNode> {
    const managedNode = await ManagedNode.findOneOrFail(nodeId);
    return managedNode.getUserPermitted(currentUser, UserPermission.READ);
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
    const nodeRequest = await NodeRequest.findOneOrFail(requestId, {
      relations: ['config', 'coreTemplate'],
    });

    nodeRequest.state = NodeRequestState.APPROVED;
    await nodeRequest.save();

    const newNode = await controller.createNode({
      name: `${nodeRequest.name}-prod`,
      coreTemplate: nodeRequest.coreTemplate.itemID,
      ...input,
    });

    const newManagedNode = await ManagedNode.create({
      ...input,
      name: newNode.name,
      coreTemplateId: nodeRequest.coreTemplate.id,
      controllerId: record.id,
      node: newNode.id,
    }).save();

    await ManagedNodePermission.create({
      managedNodeId: newManagedNode.id,
      userId: nodeRequest.userId,
      userPermission: [
        UserPermission.READ,
        UserPermission.WRITE,
        UserPermission.ADMIN,
      ],
    }).save();

    await newManagedNode.save();

    await initialProvisionNode({
      controller: controllerContext,
      provisioner: provisionerContext,
      node: newManagedNode.node,
      coreTemplateId: newManagedNode.coreTemplateId,
      type: ProvisionTypes.PROD,
    });

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
        await processEXEC(
          network.host,
          configuration.exec,
          newManagedNode.id,
          nodeRequest.config,
        );
    }

    return newManagedNode;
  }
}
