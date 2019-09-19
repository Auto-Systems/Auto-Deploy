// API/src/Modules/Controllers/CoreNode.ts
import { InterfaceType, Field } from 'type-graphql';

@InterfaceType()
export abstract class CoreNode {
  @Field()
  public name: string;

  @Field()
  public id: string;
}