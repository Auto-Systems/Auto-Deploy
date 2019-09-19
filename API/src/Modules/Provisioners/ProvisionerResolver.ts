// API/src/Modules/Provisioners/ProvisionerResovler.ts
import {
  parseConfigurationFile,
  processEXEC,
  processInstall,
  ENV,
} from 'API/Configuration/parseConfigurationFile';
import { AuthContext } from 'API/Context';
import { ApolloError } from 'apollo-server-koa';
import { Arg, Authorized, Ctx, Mutation, Resolver, ForbiddenError } from 'type-graphql';
import { ManagedNode } from '../Controllers/ManagedNodes/ManagedNodeModel';
import {
  initialProvisionNode,
  ProvisionTypes,
} from './Actions/initialProvision';
import { Provisioner } from './ProvisionerModel';
import { UserPermission } from '../Controllers/ManagedNodes/ManagedNodePermissionModel';

@Resolver(() => Provisioner)
export class ProvisionerResolver {
  @Authorized()
  @Mutation((returns) => Boolean)
  public async provisionNode(
    @Arg('nodeId') nodeId: string,
    @Ctx()
    { controller, provisioner, currentUser }: AuthContext,
  ): Promise<boolean> {
    const managedNode = await ManagedNode.findOne(nodeId, { relations: ['nodePermissions'] });
    if (!managedNode) throw new ApolloError('Invalid Node', 'INVALID_NODE');
    const userNodePermission = managedNode.nodePermissions.find(({ userId }) => userId === currentUser.id)

    if (!userNodePermission || !userNodePermission.userPermission.includes(UserPermission.ADMIN)) throw new ForbiddenError()

    await initialProvisionNode({
      controller,
      provisioner,
      node: managedNode.node,
      coreTemplateId: managedNode.coreTemplateId,
      type: ProvisionTypes.PROD,
    });

    return true;
  }

  @Authorized()
  @Mutation(() => String)
  async testAuth(
    @Arg('nodeId') nodeId: string,
    @Arg('command') command: string,
    @Ctx()
    { controller: { controller }, provisioner: { provisioner } }: AuthContext,
  ): Promise<string> {
    const [managedNode] = await Promise.all([
      ManagedNode.findOneOrFail(nodeId),
      provisioner.loadKeys(),
    ]);
    const { network } = await controller.getNodeInfo(managedNode.node);
    await provisioner.initProvisioner(network.host);

    return provisioner.runCommand(command);
  }

  @Authorized()
  @Mutation((returns) => String)
  public async uploadConfiguration(
    @Arg('nodeId') nodeId: string,
    @Arg('file') file: string,
    @Arg('env', () => [ENV]) env: ENV[],
    @Ctx() { controller: { controller },currentUser }: AuthContext,
  ): Promise<string> {
    const base64 = file.replace(/data:.*;base64,/, '');

    const configFile = Buffer.from(base64, 'base64');
    const configuration = parseConfigurationFile(configFile.toString());

    if (configuration.copyDirs.length > 0 || configuration.copyFiles.length > 0) throw new ApolloError(`Initial Configuration can't contain COPY`)

    const manNode = await ManagedNode.findOne(nodeId, { relations: ['nodePermissions'] });
    if (!manNode) throw new ApolloError('Invalid Node', 'INVALID_NODE');

    const userNodePermission = manNode.nodePermissions.find(({ userId }) => userId === currentUser.id)
    if (!userNodePermission || !userNodePermission.userPermission.includes(UserPermission.ADMIN)) throw new ForbiddenError()

    const { network } = await controller.getNodeInfo(manNode.node);

    if (configuration.install.length > 0)
      await processInstall(network.host, configuration.install);

    if (configuration.exec && configuration.exec.length > 0)
      await processEXEC(network.host, configuration.exec, env);

    return configFile.toString();
  }
}
