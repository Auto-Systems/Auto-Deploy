// API/src/Modules/Lifecycle/LifecycleEnvironmentModel.ts
import {
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  Entity
} from 'typeorm';
import 'reflect-metadata'
import { Lifecycle } from './LifecycleModel';

@Entity()
export class LifecycleConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Lifecycle, (lfc) => lfc.config)
  lifecycle: Lifecycle;

  @Column('text')
  key: string

  @Column('text')
  value: string
}