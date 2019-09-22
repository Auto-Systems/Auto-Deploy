// API/src/Modules/User/UserModel.ts
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Controller } from '../Controllers/ControllerModel';
import { ManagedNodePermission } from '../Controllers/ManagedNodes/ManagedNodePermissionModel';
import { NodeRequest } from '../Controllers/ManagedNodes/NodeRequestModel';

export enum UserRole {
  GUEST = 'Guest',
  USER = 'User',
  ADMIN = 'Admin',
}

registerEnumType(UserRole, { name: 'UserRole' });

@ObjectType()
@Entity()
export class User extends BaseEntity {
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
  username: string;

  @Column('enum', { enum: UserRole, array: true, default: [UserRole.USER] })
  role: UserRole[];

  @ManyToOne(() => Controller, (controller) => controller.users)
  readonly controller: Controller;
  @Column()
  controllerId: number;

  @OneToMany(
    () => ManagedNodePermission,
    (nodePermission) => nodePermission.user,
    { lazy: true },
  )
  nodePermissions: ManagedNodePermission[];

  @OneToMany(() => NodeRequest, (nodeRequest) => nodeRequest.user, {
    lazy: true,
  })
  nodeRequests: NodeRequest[];
}
