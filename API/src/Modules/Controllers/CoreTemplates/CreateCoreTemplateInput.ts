// API/src/Modules/Controllers/CoreTemplates/CreateCoreTemplateInput.ts
import { NodeOS } from 'API/Controller/types';
import { Field, InputType } from 'type-graphql';

@InputType()
export class NodeAuthInput {
  @Field()
  public username: string;

  @Field()
  public password: string;
}

@InputType()
export class CreateCoreTemplateInput {
  @Field()
  public itemID: string;

  @Field()
  public name: string;

  @Field(() => NodeOS)
  os: NodeOS;

  @Field((type) => NodeAuthInput)
  public nodeAuth: NodeAuthInput;
}
