// API/src/Modules/Configurations/Modules/DownloadModuleInput.ts
import { InputType, Field } from 'type-graphql'
import { ModuleType } from './ModuleModel'

@InputType()
export class DownloadModuleInput {
  @Field()
  git: string

  @Field(() => ModuleType)
  type: ModuleType
}