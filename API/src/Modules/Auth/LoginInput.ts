// API/src/Modules/Auth/LoginInput.ts
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string

  @Field()
  password: string
}