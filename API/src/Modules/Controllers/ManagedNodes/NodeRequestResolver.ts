// API/src/Modules/Controllers/NodeRequests/NodeRequestResolver.ts
import { Resolver, Query, Mutation, Authorized, Ctx, Arg } from 'type-graphql'
import { NodeRequest } from './NodeRequestModel';
import { AuthContext } from 'API/Context';
import { SubmitNodeRequestInput } from './SubmitNodeRequestInput'

@Resolver(() => NodeRequest)
export class NodeRequestResolver {
  @Authorized(['Admin'])
  @Query(() => [NodeRequest])
  async nodeRequests(): Promise<NodeRequest[]> {
    return NodeRequest.find()
  }

  @Authorized()
  @Mutation(() => [NodeRequest])
  async getMyNodeRequests(@Ctx() { currentUser }: AuthContext): Promise<NodeRequest[]> {
    return NodeRequest.find({ user: currentUser })
  }

  @Authorized()
  @Mutation(() => NodeRequest)
  async submitNodeRequest(@Arg('input') input: SubmitNodeRequestInput,@Ctx() { currentUser }: AuthContext): Promise<NodeRequest> {
    const newRequest = NodeRequest.create({ ...input, userId: currentUser.id });

    return newRequest.save()
  }
}