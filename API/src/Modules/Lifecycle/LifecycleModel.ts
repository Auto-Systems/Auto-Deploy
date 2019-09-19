// API/src/Modules/Lifecycle/LifecycleModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { ManagedNode } from '../Controllers/ManagedNodes/ManagedNodeModel';
import { LifecycleConfig } from './LifecycleEnvironmentModel';



@ObjectType()
@Entity()
export class Lifecycle extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => ManagedNode)
  @OneToOne(() => ManagedNode, (managedNode) => managedNode.lifecycle)
  @JoinColumn()
  node: ManagedNode
  @Column()
  nodeId: string

  @OneToMany(() => LifecycleConfig, (config) => config.lifecycle)
  @JoinColumn()
  config: LifecycleConfig[]

  @Column('text')
  file: string
}
