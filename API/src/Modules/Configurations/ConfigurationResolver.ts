// API/src/Modules/Configuration/ConfigurationResolver.ts
import { Mutation, Resolver, Query, Arg, ForbiddenError, Authorized, FieldResolver, Root } from 'type-graphql'
import { Configuration } from './ConfigurationModel'
import { Controller } from '../Controllers/ControllerModel'
import { InitialConfigurationInput } from './InitialConfigurationInput';
import { User, UserRole } from '../User/UserModel';
import { config } from 'API/config';
import { SaveConfigurationInput } from './ConfigurationInput';
import { getActiveControllerDB } from '../Controllers/getActiveController';

@Resolver(() => Configuration)
export class ConfigurationResolver {
  @Authorized(['Admin'])
  @Query(() => Configuration)
  async configuration(): Promise<Configuration> {
    return Configuration.findOneOrFail({ id: 1 })
  }

  @Query(() => Controller)
  async getControllers(): Promise<Controller[]> {
    const isSetup = await Configuration.isSetupCompleted();
    if (isSetup) throw new ForbiddenError()
    else return Controller.find()
  }



  @Query(() => Boolean)
  async getSetupCompleted(@Arg('secret') secret: string): Promise<boolean> {
    if (secret !== config.webKey) throw new ForbiddenError()
    return Configuration.isSetupCompleted()
  }

  @Mutation(() => Boolean)
  async initialConfiguration(@Arg('input') { username, activeControllerId, controllerConnection }: InitialConfigurationInput): Promise<boolean> {
    const isSetup = await Configuration.isSetupCompleted();
    if (!isSetup) throw new ForbiddenError()
    const controller = await Controller.findOneOrFail({ id: activeControllerId });
    controller.connection = controllerConnection
    await User.create({ username, role: [UserRole.USER, UserRole.ADMIN], controller: controller }).save()
    await Configuration.create({ activeController: controller }).save()
    await controller.save()
    return true
  }

  @Mutation(() => Boolean)
  async addUser(@Arg('username') username: string): Promise<User> {
    return User.create({ username, role: [UserRole.USER], controllerId: 1 }).save()
  }

  @Authorized(['Admin'])
  @Mutation(() => Configuration)
  async saveConfiguration(@Arg('input') { controllerHost, controllerGit }: SaveConfigurationInput): Promise<Configuration> {
    const [controller, configuration] = await Promise.all([getActiveControllerDB(), Configuration.findOneOrFail({ id: 1 })])
    controller.connection = controllerHost

    configuration.controllerGit = controllerGit
    await Promise.all([configuration.save(), controller.save()])
    return configuration;
  }

  @FieldResolver(() => String, { nullable: true })
  async controllerHost(@Root() config: Configuration): Promise<string> {
    return (await Controller.findOneOrFail(config.activeControllerId)).connection
  }
}