// API/src/Modules/Controllers/Nodes/NodePower.ts
import { NodePower } from 'API/Controller/types';
import { registerEnumType } from 'type-graphql';

registerEnumType(NodePower, { name: 'NodePower' });
