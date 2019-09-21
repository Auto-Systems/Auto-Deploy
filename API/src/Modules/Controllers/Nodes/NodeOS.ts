// API/src/Modules/Controllers/Nodes/NodeOS.ts
import { registerEnumType } from 'type-graphql'
import { NodeOS } from 'API/Controller/types'

registerEnumType(NodeOS, { name: 'NodeOS' })