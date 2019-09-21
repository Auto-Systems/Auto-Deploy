// API/src/Modules/Controllers/Logging/LoggingModule.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import { ManagedNode } from '../ManagedNodes/ManagedNodeModel';

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

  @Field()
  @Column('text')
  command: string;

  @Field()
  @Column('text')
  result: string

  @ManyToOne(() => ManagedNode, (manNode) => manNode.logs)
  managedNode: ManagedNode
  @Column()
  managedNodeId: string
}
