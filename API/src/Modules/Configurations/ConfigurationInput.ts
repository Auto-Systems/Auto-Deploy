// API/src/Modules/Configurations/InitialConfigurationsInput.ts
import { InputType, Field, Int } from 'type-graphql'

@InputType()
export class ConfigurationInput {
  @Field()
  username: string

  @Field(() => Int)
  activeControllerId: number
}

@InputType()
export class SaveConfigurationInput {
  @Field()
  controllerHost: string
}