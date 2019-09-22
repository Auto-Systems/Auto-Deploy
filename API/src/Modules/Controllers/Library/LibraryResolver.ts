// API/src/Modules/Controllers/Library/LibraryResolver.ts
import { AuthContext } from 'API/Context';
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Library, LibraryItem, LibraryItemFilter } from './Library';

@Resolver(() => Library)
export class LibraryResolver {
  @Authorized()
  @Query(() => [Library])
  public async libraries(@Ctx()
  {
    controller: { controller },
  }: AuthContext): Promise<Library[]> {
    return controller.listLibraries();
  }

  @Authorized()
  @Query(() => LibraryItem)
  async libraryItem(
    @Arg('id') itemId: string,
    @Ctx() { controller: { controller } }: AuthContext,
  ): Promise<LibraryItem> {
    return controller.getLibraryItem(itemId);
  }

  @Authorized()
  @Query(() => [LibraryItem])
  async libraryItems(@Ctx()
  {
    controller: { controller },
  }: AuthContext): Promise<LibraryItem[]> {
    const items: LibraryItem[] = [];
    for (const library of await controller.listLibraries())
      items.push(...library.items);
    return items;
  }

  @Authorized()
  @FieldResolver(() => [LibraryItem])
  public async items(
    @Root() Library: Library,
    @Arg('filter', { nullable: true }) filter: LibraryItemFilter,
  ): Promise<LibraryItem[]> {
    if (filter) {
      return Library.items.filter((itm) =>
        itm
          ? Object.entries(filter).every(([type, value]) =>
              // @ts-ignore
              itm[type as keyof Library].includes(value),
            )
          : true,
      );
    } else return Library.items;
  }
}
