// API/src/Modules/Configurations/Modules/ModuleResolver.ts
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { InstallModuleInput } from './InstallModuleInput';
import { InitialModules, Module, ModuleType } from './ModuleModel';

export const initialControllerModules: InitialModules[] = [
  {
    type: ModuleType.CONTROLLER,
    name: 'vCenter',
    git: 'https://github.com/Auto-Systems/vCenter-Controller.git',
  },
];

export const initialProvisionerModules: InitialModules[] = [
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
  async installModule(
    @Arg('input')
    input: InstallModuleInput,
  ): Promise<Module> {
    return Module.installModule(input);
  }
}
