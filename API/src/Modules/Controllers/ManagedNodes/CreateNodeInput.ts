// API/src/Modules/Controllers/ManagedNodes/CreateNodeInput.ts
import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateNodeInput {
  @Field()
  public name: string;

  @Field()
  public network: string;

  @Field()
  public host: string;

  @Field()
  public storage: string;

  @Field()
  public coreTemplate: number;
}
