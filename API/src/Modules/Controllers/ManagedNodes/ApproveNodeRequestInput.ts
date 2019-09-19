// API/src/Modules/Controllers/ManagedNodes/ApproveNodeRequestInput.ts
import { InputType, Field } from 'type-graphql';

@InputType()
export class ApproveNodeRequestInput {
  @Field()
  storage: string

  @Field()
  network: string

  @Field()
  host: string
}