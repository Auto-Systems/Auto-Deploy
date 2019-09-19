// API/src/Modules/Controllers/Library/Library.ts
import { LibraryItemType, LibraryItemTypeENUM } from 'API/Controller/types';
import { Authorized, Field, InputType, ObjectType, registerEnumType } from 'type-graphql';

registerEnumType(LibraryItemTypeENUM, {
  name: 'LibraryItemType'
})

@ObjectType()
export class LibraryItem {
  @Field()
  public name: string;

  @Field()
  public id: string;

  @Field(type => LibraryItemTypeENUM)
  public type: LibraryItemType;

  @Field()
  public description: string;
}

@InputType()
export class LibraryItemFilter implements Partial<LibraryItem> {
  @Field({ nullable: true })
  public name: string;

  @Field(type => LibraryItemTypeENUM, { nullable: true })
  public type: LibraryItemType;
}

@ObjectType()
export class Library {
  @Field()
  public name: string;

  @Field()
  public id: string;

  @Field()
  public description: string;

  @Field(type => [LibraryItem])
  @Authorized(['Admin'])
  public items: LibraryItem[]
}

