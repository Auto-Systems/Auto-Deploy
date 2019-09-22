// API/src/Modules/Controllers/ControllerModel.ts
import { ControllerContext } from 'API/Context';
import { getMethod } from 'API/Controller/Decorators/MethodDecorator';
import {
  ControllerMethodENUM,
  ControllerModule,
  InitControllerParams,
} from 'API/Controller/types';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../User/UserModel';
import { CoreTemplate } from './CoreTemplates/CoreTemplateModel';
import { extractController } from './getActiveController';
import { ManagedNode } from './ManagedNodes/ManagedNodeModel';

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

  static async getController(
    params?: InitControllerParams,
  ): Promise<ControllerContext | undefined> {
    const activeController = await Controller.findOne({
      where: { active: true },
    });
    if (!activeController) return undefined;
    const controller = extractController(activeController.path);
    if (!controller) return undefined;

    const ControllerClass = new controller() as any;

    // @ts-ignore
    let controllerModule: ControllerModule = {};

    for (const [method] of Object.entries(ControllerMethodENUM) as [
      keyof ControllerModule,
      any,
    ][]) {
      // @ts-ignore
      controllerModule[method] = getMethod(method, ControllerClass);
    }

    if (params) await controllerModule.initController(params);

    return { controller: controllerModule, record: activeController };
  }
}
