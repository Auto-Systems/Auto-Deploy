// API/Context.ts
import { verify } from 'jsonwebtoken';
import { Context as KoaContext } from 'koa';
import { config } from './config';
import { ControllerModule } from './Controller/types';
import { Controller } from './Modules/Controllers/ControllerModel';
import { Provisioner } from './Modules/Provisioners/ProvisionerModel';
import { User } from './Modules/User/UserModel';
import { ProvisionerModule } from './Provisioner/types';

export interface ControllerContext {
  controller: ControllerModule;
  record: Controller;
}

export interface ProvisionerContext {
  provisioner: ProvisionerModule;
  record: Provisioner;
}

export interface Context {
  currentUser?: User;
  controller?: ControllerContext;
  provisioner?: ProvisionerContext;
}

export interface AuthContext extends Context {
  currentUser: User;
  controller: ControllerContext;
  provisioner: ProvisionerContext;
}

export type AuthToken = string;

interface AuthPayload {
  userId: number;
  sessionToken: string;
  host: string;
}

interface AuthPayload {}

export async function getContext(ctx: KoaContext): Promise<Context> {
  const authorization = ctx.headers.authorization;
  try {
    try {
      let payload = verify(
        authorization.replace(/^Bearer\s/, ''),
        config.secretKey,
      ) as AuthPayload;
      const [controller, provisioner, currentUser] = await Promise.all([
        Controller.getController({
          host: payload.host,
          token: payload.sessionToken,
        }),
        Provisioner.getProvisioner(),
        User.findOne({ id: payload.userId }),
      ]);
      return {
        controller,
        currentUser,
        provisioner,
      };
    } catch {}
    const [controller, provisioner] = await Promise.all([
      Controller.getController(),
      Provisioner.getProvisioner(),
    ]);
    return {
      controller,
      currentUser: undefined,
      provisioner,
    };
  } catch {
    return {
      controller: undefined,
      provisioner: undefined,
      currentUser: undefined

    }
  }

}

let testCurrentUser: User | undefined;

export async function getTestContext(currentUserId?: number): Promise<Context> {
  if (currentUserId) {
    testCurrentUser = await User.findOne({ where: { id: currentUserId } });
  }

  const [controller, provisioner] = await Promise.all([
    Controller.getController(),
    Provisioner.getProvisioner(),
  ]);

  return {
    currentUser: testCurrentUser,
    controller,
    provisioner,
  };
}
