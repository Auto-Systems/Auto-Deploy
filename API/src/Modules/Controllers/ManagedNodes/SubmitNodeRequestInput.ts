// API/src/Modules/Controllers/NodeRequests/SubmitNodeRequestInput.ts
import { InputType, Field } from 'type-graphql'
import { NodeRequest } from './NodeRequestModel'
import { NodeOS } from '../Nodes/NodeOS';

@InputType()
export class SubmitNodeRequestInput implements Partial<NodeRequest> {
  @Field()
  name: string

  @Field(() => NodeOS)
  os: NodeOS;

  @Field()
  purpose: string;

  @Field({ nullable: true })
  configurationFile: string;
}