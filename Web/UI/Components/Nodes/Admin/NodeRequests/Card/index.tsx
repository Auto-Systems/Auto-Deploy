// Web/UI/Components/Nodes/Admin/NodeRequests/Card/index.tsx
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { deepOrange, green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DenyButton from '@material-ui/icons/ThumbDown';
import ApproveButton from '@material-ui/icons/ThumbUp';
import React from 'react';
import { NodeRequest } from 'UI/GraphQL/graphqlTypes.gen';
import { useApproveNodeRequestMutation } from './ApproveNodeRequest.gen';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  approveButton: {
    margin: theme.spacing(1),
    backgroundColor: green['A400'],
  },
  denyButton: {
    margin: theme.spacing(1),
    backgroundColor: deepOrange['A400'],
  },
}));

export function NodeRequestCard({
  name,
  purpose,
  approveRequest
}: NodeRequest & { approveRequest: (nodeId: string) => void }): React.ReactElement {
  const classes = useStyles({});

  return (
    <>
      <Card title={name} className={classes.card}>
        <CardContent>
          <Typography variant='h5' component='h2'>
            {name}
          </Typography>
          <Typography variant='body2' component='p'>
            {purpose}
          </Typography>
        </CardContent>
        <CardActionArea>
          <Fab
            variant='extended'
            size='medium'
            color='primary'
            aria-label='add'
            className={classes.denyButton}
          >
            <DenyButton fontSize='default' className={classes.extendedIcon} />
            Deny
          </Fab>
          <Fab
            variant='extended'
            size='medium'
            aria-label='add'
            className={classes.approveButton}
            onClick={approveRequest}
          >
            <ApproveButton
              fontSize='default'
              className={classes.extendedIcon}
            />
            Approve
          </Fab>
        </CardActionArea>
      </Card>
    </>
  );
}
