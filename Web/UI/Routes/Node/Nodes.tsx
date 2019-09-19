// Web/UI/Routes/Node/Nodes.tsx
import React from 'react'
import { useManagedNodesQuery } from './ManagedNodes.gen'

export default function NodesRoutes(): React.ReactElement {
  const { data } = useManagedNodesQuery()

  return (
    <>
      {data && data.managedNodes ? data.managedNodes.map(({ name }) => <div>{name}</div>) : <div>Loading</div>}
    </>
  )
}