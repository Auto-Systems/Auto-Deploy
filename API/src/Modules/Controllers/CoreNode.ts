// API/src/Modules/Controllers/CoreNode.ts
import { Field, InterfaceType } from 'type-graphql';

@InterfaceType()
export abstract class CoreNode {
  @Field()
  public name: string;

  @Field()
  public id: string;
}
