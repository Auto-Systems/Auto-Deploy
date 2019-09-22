// API/src/Modules/Configuration/Modules/InstallModuleInput.ts
import { InputType, Field } from 'type-graphql'
import { ModuleType } from './ModuleModel'

@InputType()
export class InstallModuleInput {
  @Field()
  name: string

  @Field(() => ModuleType)
  type: ModuleType

  @Field()
  git: string
}