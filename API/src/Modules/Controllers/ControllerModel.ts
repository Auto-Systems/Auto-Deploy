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
import { Configuration } from '../Configurations/ConfigurationModel';
import { Writable } from 'stream';
import Dockerode from 'dockerode';

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
  @Column('text')
  name: string;

  @Column('text', { unique: true })
  path: string;

  @Column('text', { nullable: true })
  connection: string;

  @OneToMany(() => ManagedNode, (managedNode) => managedNode.controller)
  managedNodes: ManagedNode[];

  @OneToMany(() => CoreTemplate, (coreTemplate) => coreTemplate.controller)
  coreTemplates: CoreTemplate[];

  @OneToMany(() => User, (user) => user.controller)
  users: User[];

  static async downloadController(): Promise<void> {
    const configuration = await Configuration.findOne({ id: 1 });

    if (!configuration || !configuration.controllerGit) return undefined;
    const docker = new Dockerode();
    const keyStream = new Writable();
    keyStream._write = (chunk: Buffer) =>
      keyStream.emit('newKey', chunk.toString());

    await docker.run('controllerdl', [], keyStream, {
      Env: [`GIT_URL=${configuration.controllerGit}`],
      HostConfig: {
        Binds: [
          `${resolve(`${__dirname}/../../Controller/`)}:/Controller`,
        ],
      },
    });
  }

  static async getController(
    params?: InitControllerParams,
  ): Promise<ControllerContext | undefined> {
    const configuration = await Configuration.findOne({ id: 1 });

    if (!configuration || !configuration.controllerGit) return undefined;

    const activeController = await Controller.findOne({
      id: configuration.activeControllerId,
    });
    if (!activeController) return undefined;
    const controller = extractController(activeController.path);
    if (!controller) return undefined;

    const ControllerClass = new controller();

    // @ts-ignore
    let controllerModule: ControllerModule = {};

    // @ts-ignore
    for (const method of Object.keys(ControllerMethodENUM))
      // @ts-ignore
      controllerModule[method] = loadMethod(method, ControllerClass);

    if (params) await controllerModule.initController(params);

    return { controller: controllerModule, record: activeController };
  }
}
