// API/src/Modules/Controllers/Nodes/Node.ts
import { ObjectType, Field } from 'type-graphql';
import { NodePower } from './NodePower';
import { CoreNode } from '../CoreNode';

@ObjectType('Node', { description: 'Auto Deploy Node', implements: CoreNode })
export class Node implements CoreNode {
  public name: string;

  public id: string;

  @Field(() => NodePower)
  public power: NodePower;
}
