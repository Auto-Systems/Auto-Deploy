// API/src/Modules/Controllers/ManagedNodes/ManagedNodePermissionModel.ts
import { User } from 'API/Modules/User/UserModel';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ManagedNode } from './ManagedNodeModel';

export enum UserPermission {
  READ = 'READ',
  WRITE = 'WRITE',
  ADMIN = 'ADMIN',
}

@Entity()
export class ManagedNodePermission extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Column({
    type: 'enum',
    enum: UserPermission,
    array: true,
    default: [UserPermission.READ],
  })
  userPermission: UserPermission[];

  @ManyToOne(() => User, (user) => user.nodeRequests, { lazy: true })
  user: User;
  @Column()
  userId: number;

  @ManyToOne(() => ManagedNode, (managedNode) => managedNode.nodePermissions, {
    lazy: true,
  })
  managedNode: ManagedNode;
  @Column()
  managedNodeId: string;
}
