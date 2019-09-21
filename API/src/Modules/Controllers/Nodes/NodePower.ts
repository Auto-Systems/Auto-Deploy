// API/src/Modules/Controllers/Nodes/NodePower.ts
import { registerEnumType } from 'type-graphql'
import { NodePower } from 'API/Controller/types'

registerEnumType(NodePower, { name: 'NodePower' })