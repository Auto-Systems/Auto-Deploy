// API/src/Modules/Auth/loginController.ts
import { config } from 'API/config';
import { getActiveController } from 'API/Modules/Controllers/getActiveController';
import { sign } from 'jsonwebtoken';
import { ForbiddenError } from 'type-graphql';
import { Configuration } from '../Configurations/ConfigurationModel';
import { Controller } from '../Controllers/ControllerModel';
import { User } from '../User/UserModel';
import { AuthOutput } from './AuthOutput';
import { LoginInput } from './LoginInput';

export async function loginController(input: LoginInput): Promise<AuthOutput> {
  const [controller, configuration] = await Promise.all([
    getActiveController(),
    Configuration.findOne({ id: 1 }),
  ]);
  if (!configuration) throw new ForbiddenError();

  const activeController = await Controller.findOneOrFail({
    id: configuration.activeControllerId,
  });

  const localUser = await User.findOne({
    where: { username: input.username, controllerId: activeController.id },
  });
  if (!localUser) throw new ForbiddenError();

  const token = await controller.loginController({
    host: activeController.connection,
    ...input,
  });

  return {
    token: sign(
      {
        sessionToken: token,
        host: activeController.connection,
        userId: localUser.id,
      },
      config.secretKey,
      {
        expiresIn: '60m',
      },
    ),
    role: localUser.role,
    success: true
  };
}
