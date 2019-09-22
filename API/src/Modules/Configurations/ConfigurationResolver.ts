// API/src/Modules/Configuration/ConfigurationResolver.ts
import { config } from 'API/config';
import { createInstalledControllers } from 'API/Library/getControllers';
import { createInstalledProvisioners } from 'API/Library/getProvisioner';
import {
  Arg,
  Authorized,
  Field,
  FieldResolver,
  ForbiddenError,
  Mutation,
  ObjectType,
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

@ObjectType()
class InitialModule {
  @Field()
  name: string;

  @Field()
  git: string;
}

@Resolver(() => Configuration)
export class ConfigurationResolver {
  @Authorized(['Admin'])
  @Query(() => Configuration)
  async configuration(): Promise<Configuration> {
    return Configuration.findOneOrFail({ id: 1 });
  }

  @Query(() => [InitialModule])
  async getInitialControllers(): Promise<InitialModule[]> {
    if (await Configuration.isSetupCompleted()) throw new ForbiddenError();
    return [
      {
        name: 'vCenter',
        git: 'https://github.com/Auto-Systems/vCenter-Controller.git',
      },
    ];
  }

  @Query(() => [InitialModule])
  async getIntialProvisioners(): Promise<InitialModule[]> {
    if (await Configuration.isSetupCompleted()) throw new ForbiddenError();
    else
      return [
        {
          name: 'SSH',
          git: 'https://github.com/Auto-Systems/SSH-Provisioner.git',
        },
      ];
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
      Controller.downloadController(initialControllerGit),
      Provisioner.downloadProvisioner(initialProvisionerGit),
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
