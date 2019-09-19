// API/src/Modules/Controllers/Nodes/NodeOS.ts
import { registerEnumType } from 'type-graphql'

export enum NodeOS {
  UBUNTU = 'UBUNTU',
  DEBIAN = 'DEBIAN'
}

registerEnumType(NodeOS, { name: 'NodeOS' })