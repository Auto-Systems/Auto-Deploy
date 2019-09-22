// API/src/Modules/Configurations/InitialConfigurationInput.ts
import { Field, InputType } from 'type-graphql';

@InputType()
export class InitialConfigurationInput {
  @Field()
  username: string;

  @Field()
  controllerConnection: string;

  @Field()
  initialControllerGit: string;

  @Field()
  initialProvisionerGit: string;
}
