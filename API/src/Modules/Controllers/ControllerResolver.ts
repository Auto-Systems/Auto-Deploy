// API/src/Modules/Controllers/ControllerResolver.ts
import { Authorized, Query, Resolver, Mutation, Arg } from 'type-graphql';
import { Controller } from './ControllerModel';

@Resolver(() => Controller)
export class ControllerResovler {
  @Authorized(['Admin'])
  @Query(() => [Controller])
  async controllers(): Promise<Controller[]> {
    return Controller.find();
  }

  @Authorized(['Admin'])
  @Mutation(() => Boolean)
  async downloadController(@Arg('git') git: string): Promise<boolean> {
    return Controller.downloadController(git)
  }
}
