// API/src/Modules/Controllers/NodeRequests/NodeRequestResolver.ts
import { Resolver, Query, Mutation, Authorized, Ctx, Arg } from 'type-graphql';
import { NodeRequest, NodeRequestState } from './NodeRequestModel';
import { AuthContext } from 'API/Context';
import { SubmitNodeRequestInput } from './SubmitNodeRequestInput';
import { NodeRequestENVConfig } from './NodeRequestENVModel';

@Resolver(() => NodeRequest)
export class NodeRequestResolver {
  @Authorized(['Admin'])
  @Query(() => [NodeRequest])
  async nodeRequests(@Arg('state', () => NodeRequestState) state: NodeRequestState): Promise<NodeRequest[]> {
    return NodeRequest.find({ state });
  }

  @Authorized()
  @Mutation(() => [NodeRequest])
  async getMyNodeRequests(@Ctx() { currentUser }: AuthContext): Promise<
    NodeRequest[]
  > {
    return NodeRequest.find({ user: currentUser });
  }

  @Authorized()
  @Mutation(() => NodeRequest)
  async submitNodeRequest(
    @Arg('input') { env, ...input }: SubmitNodeRequestInput,
    @Ctx() { currentUser }: AuthContext,
  ): Promise<NodeRequest> {
    const newRequest = NodeRequest.create({ ...input, userId: currentUser.id, config: [] });
    if (env)
      for (const { key, value } of env)
        newRequest.config.push(
          await NodeRequestENVConfig.create({
            key,
            value: value,
          }).save(),
        );
    return newRequest.save();
  }
}
