// API/src/Modules/Controllers/Networks/Network.ts
import { ObjectType } from 'type-graphql'
import { CoreNode } from '../CoreNode';

@ObjectType({ implements: CoreNode })
export class Network implements CoreNode {
  public id: string;

  public name: string;
}