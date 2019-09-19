// API/src/Modules/Controllers/Library/LibraryResolver.ts
import { Resolver, Query, FieldResolver, Root, Arg, Ctx, Authorized } from 'type-graphql';
import { Library, LibraryItemFilter, LibraryItem } from './Library';
import { AuthContext } from 'API/Context';

@Resolver(() => Library)
export class LibraryResolver {
  @Authorized()
  @Query(() => [Library])
  public async libraries(@Ctx() { controller: { controller } }: AuthContext): Promise<Library[]> {
    return controller.listLibraries();
  }

  @Authorized()
  @Query(() => LibraryItem)
  async libraryItem(@Arg('id') itemId: string, @Ctx() { controller: { controller } }: AuthContext): Promise<LibraryItem> {
    return controller.getLibraryItem(itemId)
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
