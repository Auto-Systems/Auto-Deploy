// API/src/Modules/Configurations/Modules/ModuleResolver.ts
import { Controller } from 'API/Modules/Controllers/ControllerModel';
import { Provisioner } from 'API/Modules/Provisioners/ProvisionerModel';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InstallModuleInput } from './InstallModuleInput';
import { InitialModules, Module, ModuleType } from './ModuleModel';

const initialControllerModules: InitialModules[] = [
  {
    type: ModuleType.CONTROLLER,
    name: 'vCenter',
    git: 'https://github.com/Auto-Systems/vCenter-Controller.git',
  },
];
const initialProvisionerModules: InitialModules[] = [
  {
    type: ModuleType.PROVISIONER,
    name: 'SSH',
    git: 'https://github.com/Auto-Systems/SSH-Provisioner.git',
  },
];
const initialModules = [
  ...initialControllerModules,
  ...initialProvisionerModules,
];

@Resolver(() => Module)
export class ModuleResolver {
  @Query(() => [InitialModules])
  initialModules(
    @Arg('type', () => ModuleType, { nullable: true }) type: ModuleType,
  ): InitialModules[] {
    if (type) return initialModules.filter((module) => module.type === type);
    else return initialModules;
  }

  @Mutation(() => Module)
  async installModule(@Arg('input')
  {
    type,
    git,
    name,
  }: InstallModuleInput): Promise<Module> {
    let installedModule: Module = Module.create({ name, git, type });

    switch (type) {
      case ModuleType.CONTROLLER:
        await Controller.downloadController(git);
        break;
      case ModuleType.PROVISIONER:
        await Provisioner.downloadProvisioner(git);
        break;
    }

    return installedModule.save();
  }
}
