// API/src/Modules/Controllers/Storage/StorageResolver
import { AuthContext } from 'API/Context';
import { Authorized, Ctx, Query, Resolver } from 'type-graphql';
import { Storage } from './Storage';

@Resolver(() => Storage)
export class StorageResovler {
  @Authorized()
  @Query((returns) => [Storage])
  public async storages(@Ctx()
  {
    controller: { controller },
  }: AuthContext): Promise<Storage[]> {
    return controller.listStorage();
  }
}
