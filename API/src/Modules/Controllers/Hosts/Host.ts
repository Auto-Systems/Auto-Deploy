// API/src/Modules/Controllers/Hosts/Hosts.ts
import { ObjectType } from 'type-graphql';
import { CoreNode } from '../CoreNode';

@ObjectType({ implements: CoreNode })
export class Host implements CoreNode {
  public id: string;

  public name: string;
}
