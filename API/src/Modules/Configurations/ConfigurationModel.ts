// API/src/Modules/Configurations/ConfigurationModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Controller } from 'API/Modules/Controllers/ControllerModel';
import { Provisioner } from 'API/Modules/Provisioners/ProvisionerModel';

@ObjectType()
@Entity()
export class Configuration extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field({ nullable: true })
  @Column('varchar', { nullable: true })
  controllerGit: string;

  @ManyToOne(() => Configuration, { lazy: true })
  activeController: Controller;
  @Column()
  activeControllerId: number;

  @ManyToOne(() => Provisioner, { nullable: true, lazy: true })
  activeProvisioner: Provisioner;
  @Column({ nullable: true })
  activeProvisionerId: number;

  static async isSetupCompleted(): Promise<boolean> {
    return (await Controller.count({ id: 1 })) > 0;
  }
}
