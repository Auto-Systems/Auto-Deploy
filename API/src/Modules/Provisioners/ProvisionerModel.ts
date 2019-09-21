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
import { extractProvisioner } from './getActiveProvisioner';
import {
  ProvisionerModule,
  ProvisionerMethodENUM,
} from 'API/Provisioner/types';
import { loadMethod } from 'API/Provisioner/Decorators/MethodDecorator';
import { Writable } from 'stream';
import Dockerode from 'dockerode';
import { resolve } from 'path';
import pEvent from 'p-event';

const timeout = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

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
  @Column('bool', { unique: true })
  active: boolean;

  @Field()
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  path: string;

  static async downloadProvisioner(provisionerGit: string): Promise<boolean> {
    const docker = new Dockerode();
    const keyStream = new Writable();
    keyStream._write = (chunk: Buffer) =>
      keyStream.emit('data', chunk.toString());


    await Promise.all([docker.run('controllerdl', [], keyStream, {
      Env: [`GIT_URL=${provisionerGit}`],
      HostConfig: {
        Binds: [`${resolve(`${__dirname}/../../Provisioner/`)}:/Controller`],
      },
    }), pEvent<string, string>(keyStream, 'data') ])
    await timeout(2500)
    return true;
  }

  static async getProvisioner(): Promise<ProvisionerContext | undefined> {
    const activeProvisioner = await Provisioner.findOne({
      where: { enabled: true },
    });
    if (!activeProvisioner) return undefined;

    const provisioner = extractProvisioner(activeProvisioner.path);
    if (!provisioner) return undefined;

    const ProvisionerClass = new provisioner();

    // @ts-ignore
    let provisionerModule: ProvisionerModule = {};

    // @ts-ignore
    // prettier-ignore
    for (const method of Object.keys(ProvisionerMethodENUM)) provisionerModule[method] = loadMethod(method, ProvisionerClass);

    return { provisioner: provisionerModule, record: activeProvisioner };
  }
}
