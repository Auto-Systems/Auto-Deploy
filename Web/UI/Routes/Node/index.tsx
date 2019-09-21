// Web/UI/Routes/Node/index.tsx
import React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { NodePage } from 'UI/Components/Nodes/Node';

export default function NodeRoute(
  props: RouteComponentProps<{ nodeId: string }>,
): React.ReactElement {
  console.log('Test')
  if (!props.match.params.nodeId) return <Redirect to='/' />;
  else return <NodePage nodeId={props.match.params.nodeId} />;
}
