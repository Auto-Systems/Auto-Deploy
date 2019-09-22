// API/src/Modules/Controllers/Logging/LoggingModule.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ManagedNode } from '../ManagedNodes/ManagedNodeModel';
import { CommandResult } from './CommandResultModel'

@ObjectType()
@Entity()
export class Log extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field(() => [CommandResult])
  @OneToMany(() => CommandResult, (commandResult) => commandResult.log, { lazy: true })
  commandResults: CommandResult[]

  @ManyToOne(() => ManagedNode, (manNode) => manNode.logs)
  managedNode: ManagedNode
  @Column()
  managedNodeId: string
}