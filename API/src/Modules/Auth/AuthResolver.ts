// API/src/Modules/Auth/AuthResolver.ts
import { Resolver, Mutation, Arg, Query, ObjectType, Field, Ctx } from 'type-graphql';
import { AuthOutput } from './AuthOutput';
import { LoginInput } from './LoginInput';
import { loginController } from './loginController';
import { UserRole } from '../User/UserModel';
import { AuthContext } from 'API/Context';

@ObjectType()
export class UserCheck {
  @Field()
  public isAuthed: boolean;

  @Field(() => [UserRole])
  public role?: UserRole[];
}

@Resolver()
export class AuthResolver {
  @Mutation(() => AuthOutput)
  async login(@Arg('input') input: LoginInput): Promise<AuthOutput> {
    return loginController(input)
  }

  @Query(() => UserCheck)
  public async userCheck(@Ctx() { currentUser }: AuthContext): Promise<UserCheck> {
    if (!currentUser) return { isAuthed: false, role: [UserRole.GUEST] };
    else return { isAuthed: true, role: currentUser.role };
  }
}