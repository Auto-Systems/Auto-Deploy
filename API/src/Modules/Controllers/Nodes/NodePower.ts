// API/src/Modules/Controllers/Nodes/NodePower.ts
import { registerEnumType } from 'type-graphql'

export enum NodePower {
  ON = 'ON',
  OFF = 'OFF',
  SUSPENDED = 'SUSPENDED'
}

registerEnumType(NodePower, { name: 'NodePower' })