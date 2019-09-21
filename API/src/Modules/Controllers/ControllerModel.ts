// API/src/Modules/Controllers/ControllerModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ManagedNode } from './ManagedNodes/ManagedNodeModel';
import { User } from '../User/UserModel';
import { CoreTemplate } from './CoreTemplates/CoreTemplateModel';
import {
  ControllerModule,
  InitControllerParams,
  ControllerMethodENUM,
} from 'API/Controller/types';
import { extractController } from './getActiveController';
import { loadMethod } from 'API/Controller/Decorators/MethodDecorator';
import { ControllerContext } from 'API/Context';
import { resolve } from 'path';
import { Writable } from 'stream';
import Dockerode from 'dockerode';
import pEvent from 'p-event';

const timeout = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

@ObjectType()
@Entity()
export class Controller extends BaseEntity {
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
  @Column('text')
  name: string;

  @Column('varchar', { unique: true })
  path: string;

  @Column('varchar', { nullable: true })
  connection: string;

  @OneToMany(() => ManagedNode, (managedNode) => managedNode.controller)
  managedNodes: ManagedNode[];

  @OneToMany(() => CoreTemplate, (coreTemplate) => coreTemplate.controller)
  coreTemplates: CoreTemplate[];

  @OneToMany(() => User, (user) => user.controller)
  users: User[];

  static async downloadController(controllerGit: string): Promise<boolean> {
    const docker = new Dockerode();
    const keyStream = new Writable();
    keyStream._write = (chunk: Buffer) =>
      keyStream.emit('data', chunk.toString());


    await Promise.all([docker.run('controllerdl', [], keyStream, {
      Env: [`GIT_URL=${controllerGit}`],
      HostConfig: {
        Binds: [`${resolve(`${__dirname}/../../Controller/`)}:/Controller`],
      },
    }), pEvent<string, string>(keyStream, 'data')])
    await timeout(2500)
    return true;
  }

  static async getController(
    params?: InitControllerParams,
  ): Promise<ControllerContext | undefined> {
     const activeController = await Controller.findOne({
      where: { active: true },
    });
    if (!activeController) return undefined;
    const controller = extractController(activeController.path);
    if (!controller) return undefined;

    const ControllerClass = new controller();

    // @ts-ignore
    let controllerModule: ControllerModule = {};

    // @ts-ignore
    // prettier-ignore    
    for (const method of Object.keys(ControllerMethodENUM)) controllerModule[method] = loadMethod(method, ControllerClass);

    if (params) await controllerModule.initController(params);

    return { controller: controllerModule, record: activeController };
  }
}
