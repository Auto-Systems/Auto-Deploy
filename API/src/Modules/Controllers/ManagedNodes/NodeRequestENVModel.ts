import 'reflect-metadata';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { NodeRequest } from './NodeRequestModel';

@Entity()
export class NodeRequestENVConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => NodeRequest, (lfc) => lfc.config)
  request: NodeRequest;

  @Column('text')
  key: string;

  @Column('text')
  value: string;
}
