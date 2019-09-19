// API/src/Modules/Controllers/ControllerResolver.ts
import { Authorized, Query, Resolver } from 'type-graphql';
import { Controller } from './ControllerModel';

@Resolver(() => Controller)
export class ControllerResovler {
  @Authorized(['Admin'])
  @Query(() => [Controller])
  async controllers(): Promise<Controller[]> {
    return Controller.find();
  }
}
