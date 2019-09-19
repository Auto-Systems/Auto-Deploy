// API/src/Modules/Configurations/InitialConfigurationInput.ts
import { InputType, Field } from 'type-graphql'

@InputType()
export class InitialConfigurationInput {
  @Field()
  username: string

  @Field()
  controllerConnection: string

  @Field()
  activeControllerId: number
}