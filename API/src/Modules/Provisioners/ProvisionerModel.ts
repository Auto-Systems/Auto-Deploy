// API/src/Modules/Provisioners/ProvisionerModel.ts
import { ProvisionerContext } from 'API/Context';
import { loadMethod } from 'API/Provisioner/Decorators/MethodDecorator';
import {
  ProvisionerMethodENUM,
  ProvisionerModule,
} from 'API/Provisioner/types';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { extractProvisioner } from './getActiveProvisioner';

@ObjectType()
@Entity()
export class Provisioner extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Date)
  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @Field()
  @Column('bool', { unique: true })
  active: boolean;

  @Field()
  @Column('varchar')
  name: string;

  @Column('varchar', { unique: true })
  path: string;

  static async getProvisioner(): Promise<ProvisionerContext | undefined> {
    const activeProvisioner = await Provisioner.findOne({
      where: { enabled: true },
    });
    if (!activeProvisioner) return undefined;

    const provisioner = extractProvisioner(activeProvisioner.path);
    if (!provisioner) return undefined;

    const ProvisionerClass = new provisioner();

    // @ts-ignore
    let provisionerModule: ProvisionerModule = {};

    // @ts-ignore
    // prettier-ignore
    for (const method of Object.keys(ProvisionerMethodENUM)) provisionerModule[method] = loadMethod(method, ProvisionerClass);

    return { provisioner: provisionerModule, record: activeProvisioner };
  }
}
