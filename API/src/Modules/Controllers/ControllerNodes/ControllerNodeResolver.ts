// API/src/Modules/Controllers/ControllerNodes/ControllerNodeResolver.ts
import { AuthContext } from 'API/Context';
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { CoreTemplate } from '../CoreTemplates/CoreTemplateModel';
import { ControllerNode, ControllerNodeTypes } from './ControllerNode';

@Resolver(() => ControllerNode)
export class ControllerNodeResolver {
  @Authorized()
  @Query(() => [ControllerNode])
  async getControllerNodes(
    @Arg('type', () => ControllerNodeTypes) nodeType: ControllerNodeTypes,
    @Ctx() { controller: { controller } }: AuthContext,
  ): Promise<ControllerNode[]> {
    switch (nodeType) {
      case ControllerNodeTypes.NETWORK:
        return controller.listNetworks();
      case ControllerNodeTypes.STORAGE:
        return controller.listStorage();
      case ControllerNodeTypes.HOST:
        return controller.listHosts();
      case ControllerNodeTypes.CORE_TEMPLATE:
        return CoreTemplate.find();
    }
  }

  @Authorized()
  @Query(() => ControllerNode)
  async getControllerNode(
    @Arg('type', () => ControllerNodeTypes) nodeType: ControllerNodeTypes,
    @Arg('id') id: string,
    @Ctx() { controller: { controller } }: AuthContext,
  ): Promise<ControllerNode> {
    switch (nodeType) {
      case ControllerNodeTypes.NETWORK:
        return (await controller.listNetworks())[0];
      case ControllerNodeTypes.STORAGE:
        return (await controller.listStorage())[0];
      case ControllerNodeTypes.HOST:
        return (await controller.listHosts())[0];
      case ControllerNodeTypes.CORE_TEMPLATE:
        return CoreTemplate.findOneOrFail(id);
    }
  }
}
