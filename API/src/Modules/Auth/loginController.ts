// API/src/Modules/Auth/loginController.ts
import { config } from 'API/config';
import { sign } from 'jsonwebtoken';
import { ForbiddenError } from 'type-graphql';
import { Controller } from '../Controllers/ControllerModel';
import { User } from '../User/UserModel';
import { AuthOutput } from './AuthOutput';
import { LoginInput } from './LoginInput';

export async function loginController(input: LoginInput): Promise<AuthOutput> {
  const activeController = await Controller.getController();
  if (!activeController) throw new ForbiddenError();

  const { controller, record } = activeController;

  const localUser = await User.findOne({
    where: { username: input.username, controllerId: record.id },
  });
  if (!localUser) throw new ForbiddenError();

  const token = await controller.loginController({
    host: record.connection,
    ...input,
  });

  return {
    token: sign(
      {
        sessionToken: token,
        host: record.connection,
        userId: localUser.id,
      },
      config.secretKey,
      {
        expiresIn: '60m',
      },
    ),
    role: localUser.role,
    success: true,
  };
}
