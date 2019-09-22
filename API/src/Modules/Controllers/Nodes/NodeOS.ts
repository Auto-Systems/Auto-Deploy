// API/src/Modules/Controllers/Nodes/NodeOS.ts
import { NodeOS } from 'API/Controller/types';
import { registerEnumType } from 'type-graphql';

registerEnumType(NodeOS, { name: 'NodeOS' });
