// Web/UI/Components/Nodes/index.tsx
import React from 'react';
import { Section } from '../Layout/Section';
import { useManagedNodesQuery } from './Nodes.gen';
import { ManagedNodeCard } from './Node/Card';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';

export function NodesPage(): React.ReactElement {
  const { data } = useManagedNodesQuery();
  const classes = useStyles({});

  return (
    <>
      <Section
        title={{ title: 'My Nodes' }}
        background='secondary'
        className={classes.topSection}
      />
      {data && data.managedNodes ? (
        <Grid container alignItems='center' justify='center' spacing={2}>
          {data.managedNodes.map((managedNode) => (
            <Grid key={managedNode.id} item>
              <ManagedNodeCard {...managedNode} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}
