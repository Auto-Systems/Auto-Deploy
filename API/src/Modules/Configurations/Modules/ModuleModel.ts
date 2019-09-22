// API/src/Modules/Configurations/Modules/Module.ts
import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

export enum ModuleType {
  CONTROLLER = 'controller',
  PROVISIONER = 'provisioner',
}

registerEnumType(ModuleType, { name: 'ModuleType' });

@ObjectType()
export class InitialModules {
  @Field()
  name: string

  @Field(() => ModuleType)
  type: ModuleType

  @Field()
  git: string
}

@Entity()
@ObjectType()
export class Module extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => ModuleType)
  @Column({ enum: ModuleType })
  type: ModuleType;

  @Field()
  @Column('varchar')
  name: string;

  @Field()
  @Column('varchar')
  git: string;
}
