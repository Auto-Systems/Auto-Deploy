// API/src/Modules/Controllers/NodeRequets/NodeRequestModel.ts
import { Field, ID, ObjectType, registerEnumType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn
} from 'typeorm';
import { User } from 'API/Modules/User/UserModel';
import { NodeRequestENVConfig } from './NodeRequestENVModel';
import { CoreTemplate } from '../CoreTemplates/CoreTemplateModel';

enum NodeRequestState {
  SUBMITTED = 'Submitted',
  APPROVED = 'Approved',
  DENIED = 'Denied',
}

registerEnumType(NodeRequestState, { name: 'NodeRequestState' });

@ObjectType()
@Entity()
export class NodeRequest extends BaseEntity {
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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.nodeRequests, { lazy: true })
  user: User
  @Column()
  userId: number

  @Field(() => CoreTemplate)
  @ManyToOne(() => CoreTemplate, )
  coreTemplate: CoreTemplate;
  @Column()
  coreTemplateId: string

  @Field()
  @Column('text')
  purpose: string;

  @Field({ nullable: true })
  @Column('text', { nullable: true })
  configurationFile: string;

  @Field(() => NodeRequestState)
  @Column({
    type: 'enum',
    enum: NodeRequestState,
    default: NodeRequestState.SUBMITTED,
  })
  state: NodeRequestState;

  @OneToMany(() => NodeRequestENVConfig, (config) => config.request)
  @JoinColumn()
  config: NodeRequestENVConfig[]
}
