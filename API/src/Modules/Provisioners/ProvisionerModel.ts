// API/src/Modules/Provisioners/ProvisionerModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProvisionerContext } from 'API/Context';
import { Configuration } from '../Configurations/ConfigurationModel';
import { parse } from 'path';
import { pathExists } from 'fs-extra';
import { run } from 'API/Library/run';
import { extractProvisioner } from './getActiveProvisioner';
import { ProvisionerModule, ProvisionerMethodENUM } from 'API/Provisioner/types';
import { loadMethod } from 'API/Provisioner/Decorators/MethodDecorator';

@ObjectType()
@Entity()
export class Provisioner extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  path: string;

  static async getProvisioner(): Promise<ProvisionerContext | undefined> {
    const configuration = await Configuration.findOne({ id: 1 });

    if (!configuration || !configuration.activeProvisionerId) return undefined;

    const activeProvisioner = await Provisioner.findOne({
      id: configuration.activeControllerId,
    });
    if (!activeProvisioner) return undefined;

    const { dir } = parse(activeProvisioner.path);
    const [provisionerPKGJSON, provisionerModules] = await Promise.all([
      pathExists(`${dir}/package.json`),
      pathExists(`${dir}/node_modules`),
    ]);
    if (provisionerPKGJSON && !provisionerModules)
      await run('npm install', { cwd: dir });

    const provisioner = extractProvisioner(activeProvisioner.path);
    if (!provisioner) return undefined;

    const ProvisionerClass = new provisioner();

    // @ts-ignore
    let provisionerModule: ProvisionerModule = {};
  
    // @ts-ignore
    for (const method of Object.keys(ProvisionerMethodENUM)) provisionerModule[method] = loadMethod(method, ProvisionerClass);
  
    return { provisioner: provisionerModule, record: activeProvisioner };
  }
}
