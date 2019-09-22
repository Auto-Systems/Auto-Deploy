// API/src/Modules/Conrollers/Logging/CommandResultModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Log } from './LogModel'

@ObjectType()
@Entity()
export class CommandResult extends BaseEntity {
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

  @ManyToOne(() => Log, (log) => log.commandResults)
  @JoinColumn()
  log: Log
  @Column()
  logId: string
}


