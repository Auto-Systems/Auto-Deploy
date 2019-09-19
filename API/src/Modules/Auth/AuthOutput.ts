// API/src/Modules/Auth/AuthOutput.ts
import { ObjectType, Field } from 'type-graphql'
import { UserRole } from '../User/UserModel'

@ObjectType()
export class AuthOutput {
  @Field()
  token: string

  @Field()
  success: boolean

  @Field(() => [UserRole])
  role: UserRole[]
}