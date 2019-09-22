// API/src/Modules/Configurations/InitialConfigurationsInput.ts
import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class ConfigurationInput {
  @Field()
  username: string;

  @Field(() => Int)
  activeControllerId: number;
}

@InputType()
export class SaveConfigurationInput {
  @Field()
  controllerHost: string;
}
