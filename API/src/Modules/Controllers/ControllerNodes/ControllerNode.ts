// API/src/Modules/Controllers/ControllerNodes/ControllerNode.ts
import {
  Field,
  InterfaceType,
  ObjectType,
  registerEnumType,
} from 'type-graphql';

@InterfaceType({ isAbstract: true })
export abstract class BaseCoreNode {
  @Field()
  public name: string;

  @Field()
  public id: string;
}

@ObjectType({ implements: BaseCoreNode })
export class ControllerNode implements BaseCoreNode {
  public name: string;

  public id: string;
}

export enum ControllerNodeTypes {
  NETWORK = 'network',
  STORAGE = 'storage',
  HOST = 'host',
  CORE_TEMPLATE = 'coreTemplate',
}

registerEnumType(ControllerNodeTypes, { name: 'ControllerxNodeTypes' });
