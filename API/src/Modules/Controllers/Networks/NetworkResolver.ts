// API/src/Modules/Controllers/Networks/NetworkResolver.ts
import { AuthContext } from 'API/Context';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Network } from './Network';

@Resolver(() => Network)
export class NetworkResolver {
  @Authorized()
  @Query(() => [Network])
  public async networks(@Ctx()
  {
    controller: { controller },
  }: AuthContext): Promise<Network[]> {
    return controller.listNetworks();
  }
}
