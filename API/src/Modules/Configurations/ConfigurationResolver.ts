// API/src/Modules/Configuration/ConfigurationResolver.ts
import { config } from 'API/config';
import { createInstalledControllers } from 'API/Library/getControllers';
import { createInstalledProvisioners } from 'API/Library/getProvisioner';
import {
  Arg,
  Authorized,
  FieldResolver,
  ForbiddenError,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Controller } from '../Controllers/ControllerModel';
import { Provisioner } from '../Provisioners/ProvisionerModel';
import { User, UserRole } from '../User/UserModel';
import { SaveConfigurationInput } from './ConfigurationInput';
import { Configuration } from './ConfigurationModel';
import { InitialConfigurationInput } from './InitialConfigurationInput';
import { Module, ModuleType } from './Modules/ModuleModel';
import {
  initialControllerModules,
  initialProvisionerModules,
} from './Modules/ModuleResolver';

@Resolver(() => Configuration)
export class ConfigurationResolver {
  @Authorized(['Admin'])
  @Query(() => Configuration)
  async configuration(): Promise<Configuration> {
    return Configuration.findOneOrFail({ id: 1 });
  }

  @Query(() => Boolean)
  async getSetupCompleted(@Arg('secret') secret: string): Promise<boolean> {
    if (secret !== config.webKey) throw new ForbiddenError();
    return Configuration.isSetupCompleted();
  }

  @Mutation(() => Boolean)
  async initialConfiguration(@Arg('input')
  {
    username,
    initialControllerGit,
    controllerConnection,
    initialProvisionerGit,
  }: InitialConfigurationInput): Promise<boolean> {
    const isSetup = await Configuration.isSetupCompleted();
    if (isSetup) throw new ForbiddenError();

    await Promise.all([
      Module.installModule({
        name: initialControllerModules.find(
          ({ git }) => git === initialControllerGit,
        )!.name,
        type: ModuleType.CONTROLLER,
        git: initialControllerGit,
      }),
      Module.installModule({
        name: initialProvisionerModules.find(
          ({ git }) => git === initialProvisionerGit,
        )!.name,
        type: ModuleType.PROVISIONER,
        git: initialProvisionerGit,
      }),
    ]);

    await Promise.all([
      createInstalledControllers(),
      createInstalledProvisioners(),
    ]);

    const [controller, provisioner] = await Promise.all([
      Controller.findOneOrFail({ id: 1 }),
      Provisioner.findOneOrFail({ id: 1 }),
    ]);

    controller.connection = controllerConnection;
    controller.active = true;

    provisioner.active = true;

    await Promise.all([
      User.create({
        username,
        role: [UserRole.USER, UserRole.ADMIN],
        controller: controller,
      }).save(),
      Configuration.create({}).save(),
      controller.save(),
      provisioner.save(),
    ]);
    return true;
  }

  @Mutation(() => Boolean)
  async addUser(@Arg('username') username: string): Promise<User> {
    return User.create({
      username,
      role: [UserRole.USER],
      controllerId: 1,
    }).save();
  }

  @Authorized(['Admin'])
  @Mutation(() => Configuration)
  async saveConfiguration(@Arg('input')
  {
    controllerHost,
  }: SaveConfigurationInput): Promise<Configuration> {
    const [activeController, configuration] = await Promise.all([
      Controller.getController(),
      Configuration.findOneOrFail({ id: 1 }),
    ]);
    if (!activeController) throw new Error();
    const { record } = activeController;
    record.connection = controllerHost;
    await Promise.all([record.save()]);
    return configuration;
  }

  @FieldResolver(() => String, { nullable: true })
  async controllerHost(@Root() config: Configuration): Promise<string> {
    return (await Controller.findOneOrFail({ where: { enabled: true } }))
      .connection;
  }
}
