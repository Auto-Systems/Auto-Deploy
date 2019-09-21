// API/src/Modules/Controllers/CoreTemplates/CoreTemplateModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Controller } from '../ControllerModel';
import { ManagedNode } from '../ManagedNodes/ManagedNodeModel';
import { NodeOS } from 'API/Controller/types';
import { NodeRequest } from '../ManagedNodes/NodeRequestModel';

@ObjectType()
export class NodeAuth {
  @Column('text')
  @Field()
  public username: string;

  @Column('text')
  @Field()
  public password: string;
}

@ObjectType()
@Entity()
export class CoreTemplate extends BaseEntity {
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
  name: string

  @Field(() => NodeOS)
  @Column({ type: 'enum', enum: NodeOS })
  os: NodeOS

  @ManyToOne(() => Controller)
  readonly controller: Controller
  @Column()
  controllerId: number;

  @OneToMany(() => ManagedNode, (managedNode) => managedNode.coreTemplate)
  managedNodes: ManagedNode[]

  @OneToMany(() => NodeRequest, (nodeRequest) => nodeRequest.coreTemplate)
  nodeRequests: NodeRequest[]

  @Field(() => NodeAuth)
  @Column(() => NodeAuth)
  nodeAuth: NodeAuth;

  @Field()
  @Column('text')
  itemID: string

  static async getOSCoreTemplate(os: NodeOS): Promise<CoreTemplate | undefined> {
    return this.findOne({ where: { os } })
  }
}