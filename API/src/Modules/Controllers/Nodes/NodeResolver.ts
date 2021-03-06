// API/src/Modules/Controllers/Nodes/NodeResolver.ts
import { AuthContext } from 'API/Context';
import {
  Arg,
  ArgumentValidationError,
  Authorized,
  Ctx,
  Query,
  Resolver,
} from 'type-graphql';
import { ManagedNode } from '../ManagedNodes/ManagedNodeModel';
import { Node } from './Node';

@Resolver(() => Node)
export class NodeResolver {
  @Authorized()
  @Query((returns) => [Node], {
    nullable: 'items',
    description: 'Returns nodes from active controller module',
  })
  async nodes(@Ctx()
  {
    controller: { controller },
  }: AuthContext): Promise<Node[]> {
    return controller.listNodes();
  }

  @Authorized()
  @Query(() => Boolean)
  async testNodeStuff(
    @Arg('nodeId') nodeId: string,
    @Ctx() { controller: { controller } }: AuthContext,
  ): Promise<boolean> {
    const [managedNode] = await Promise.all([ManagedNode.findOne(nodeId)]);
    if (!managedNode)
      throw new ArgumentValidationError([
        {
          property: 'nodeId',
          constraints: {
            isValid: 'Invalid ManagedNode',
          },
          children: [],
        },
      ]);
    console.log(managedNode);
    const nodeInfo = await controller.getNodeInfo(managedNode.node);
    console.log(nodeInfo);
    return true;
  }
}
