// API/src/Modules/Controllers/ManagedNodes/ManagedNodesModel.ts
import { Field, ID, ObjectType, ForbiddenError } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { CoreTemplate } from '../CoreTemplates/CoreTemplateModel';
import { Controller } from '../ControllerModel';
import { Lifecycle } from 'API/Modules/Lifecycle/LifecycleModel';
import {
  ManagedNodePermission,
  UserPermission,
} from './ManagedNodePermissionModel';
import { User } from 'API/Modules/User/UserModel';
import { Log } from '../Logging/LogModel';

@ObjectType()
@Entity()
export class ManagedNode extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('text')
  name: string;

  @Field()
  @ManyToOne(() => CoreTemplate, (coreTemplate) => coreTemplate.managedNodes)
  readonly coreTemplate: CoreTemplate;
  @Column()
  coreTemplateId: number;

  @Field({ description: `Controller's Node ID` })
  @Column('text')
  node: string;

  @Column('text')
  network: string;

  @Column('text')
  storage: string;

  @Column('text')
  host: string;

  @ManyToOne(() => Controller, (controller) => controller.managedNodes)
  @JoinColumn()
  readonly controller: Controller;
  @Column()
  controllerId: number;

  @OneToOne(() => Lifecycle, (lifecycle) => lifecycle.node)
  lifecycle: Lifecycle;

  @OneToMany(
    () => ManagedNodePermission,
    (nodePermission) => nodePermission.managedNode,
    { lazy: true },
  )
  nodePermissions: ManagedNodePermission[];

  @Field(() => [Log])
  @OneToMany(() => Log, (log) => log.managedNode, {  lazy: true })
  @JoinColumn()
  logs: Log[]

  async getUserPermission(
    user: User,
  ): Promise<ManagedNodePermission | undefined> {
    const permissions = await this.nodePermissions;
    return permissions.find((userPerms) => userPerms.userId === user.id);
  }

  async getUserPermitted(
    user: User,
    permission: UserPermission,
  ): Promise<ManagedNode> {
    const permissions = await this.getUserPermission(user);
    if (!permissions || !permissions.userPermission.includes(permission)) throw new ForbiddenError();
    return this
  }
}
