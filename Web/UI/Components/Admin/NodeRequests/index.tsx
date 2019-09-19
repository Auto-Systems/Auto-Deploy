// Web/UI/Components/Admin/NodeRequests/index.tsx
import React from 'react';
import { useNodeRequestsQuery } from './NodeRequests.gen'
import { Section } from 'UI/Components/Layout/Section';
import { useStyles } from 'UI/Components/Admin/styles'
import { NodeRequestCard } from 'UI/Components/Nodes/Admin/NodeRequests/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useNodeStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: '3em'
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));



export function NodeRequestsPage(): React.ReactElement {
  const { data } = useNodeRequestsQuery()
  const classes = useStyles()
  const classes2 = useNodeStyles()

  return (
    <>
      <Section title={{ title: 'Node Requests' }} background='secondary' className={classes.topSection} />
      {data && data.nodeRequests ? <Grid container alignItems='center' justify='center' className={classes2.root} spacing={3}>{data.nodeRequests.map((nodeRequest) => <Grid key={nodeRequest.id} item><NodeRequestCard {...nodeRequest} /></Grid>)}</Grid> : <div>Loading</div>}
    </>
  )
}