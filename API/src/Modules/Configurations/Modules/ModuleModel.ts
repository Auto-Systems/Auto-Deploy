// API/src/Modules/Configurations/Modules/Module.ts
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { InstallModuleInput } from './InstallModuleInput';
import { DownloadModuleInput } from './DownloadModuleInput';
import { runDocker } from 'API/Modules/Docker/Utils/runDocker';
import { ControllerPath } from 'API/Library/getControllers';
import { ProvisionerPath } from 'API/Library/getProvisioner';

export enum ModuleType {
  CONTROLLER = 'controller',
  PROVISIONER = 'provisioner',
}

registerEnumType(ModuleType, { name: 'ModuleType' });

const MODULE_DL_IMAGE =
  'docker.pkg.github.com/kristianfjones/auto-deploy/moduledl';

@ObjectType()
export class InitialModules {
  @Field()
  name: string;

  @Field(() => ModuleType)
  type: ModuleType;

  @Field()
  git: string;
}

@Entity()
@ObjectType()
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ModuleType)
  @Column({ enum: ModuleType })
  type: ModuleType;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  git: string;

  /**
   * Downloads the module into the module types folder and returns the log from the work container
   */
  static async downloadModule({
    git,
    type,
  }: DownloadModuleInput): Promise<string> {
    let moduleType: string;
    switch (type) {
      case ModuleType.CONTROLLER:
        moduleType = ControllerPath;
        break;
      case ModuleType.PROVISIONER:
        moduleType = ProvisionerPath;
        break;
    }
    return runDocker({
      image: MODULE_DL_IMAGE,
      env: [
        { key: 'GIT_URL', value: git },
        { key: 'TYPE', value: moduleType! },
      ],
    });
  }

  static async installModule(input: InstallModuleInput): Promise<Module> {
    const newModule = Module.create(input).save();
    const installResult = this.downloadModule(input);
    const [createdModule] = await Promise.all([newModule, installResult]);
    return createdModule;
  }
}
