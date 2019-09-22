// API/src/Modules/Lifecycle/LifecycleEnvironmentModel.ts
import 'reflect-metadata';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lifecycle } from './LifecycleModel';

@Entity()
export class LifecycleConfig extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @ManyToOne(() => Lifecycle, (lfc) => lfc.config)
  lifecycle: Lifecycle;

  @Column('text')
  key: string;

  @Column('text')
  value: string;
}
