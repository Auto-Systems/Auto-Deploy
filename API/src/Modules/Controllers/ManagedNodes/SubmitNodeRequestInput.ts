// API/src/Modules/Controllers/NodeRequests/SubmitNodeRequestInput.ts
import { InputType, Field } from 'type-graphql'
import { NodeRequest } from './NodeRequestModel'
import { ENV } from 'API/Configuration/parseConfigurationFile';

@InputType()
export class SubmitNodeRequestInput implements Partial<NodeRequest> {
  @Field()
  name: string

  @Field()
  coreTemplateId: string;

  @Field()
  purpose: string;

  @Field({ nullable: true })
  configurationFile?: string;

  @Field(() => [ENV], { nullable: true })
  env?: ENV[]
}