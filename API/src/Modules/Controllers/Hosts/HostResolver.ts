// API/src/Modules/Controllers/Hosts/HostResolver.ts
import { AuthContext } from 'API/Context';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Host } from './Host';

@Resolver()
export class HostsResolver {
  @Authorized()
  @Query((returns) => [Host])
  public async hosts(@Ctx()
  {
    controller: { controller },
  }: AuthContext): Promise<Host[]> {
    return controller.listHosts();
  }
}
