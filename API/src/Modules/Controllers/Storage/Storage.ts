// API/src/Modules/Controllers/Storage/Storage.ts
import { ObjectType } from 'type-graphql';
import { CoreNode } from '../CoreNode';

@ObjectType({ implements: CoreNode })
export class Storage implements CoreNode {
  public id: string;

  public name: string;
}
