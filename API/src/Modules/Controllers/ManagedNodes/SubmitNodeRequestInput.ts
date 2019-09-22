// API/src/Modules/Controllers/NodeRequests/SubmitNodeRequestInput.ts
import { ENV } from 'API/Configuration/parseConfigurationFile';
import { Field, InputType } from 'type-graphql';
import { NodeRequest } from './NodeRequestModel';

@InputType()
export class SubmitNodeRequestInput implements Partial<NodeRequest> {
  @Field()
  name: string;

  @Field()
  coreTemplateId: string;

  @Field()
  purpose: string;

  @Field({ nullable: true })
  configurationFile?: string;

  @Field(() => [ENV], { nullable: true })
  env?: ENV[];
}
