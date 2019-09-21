// Web/UI/Components/Nodes/Node/Node/Card/index.tsx
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import { deepOrange, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useCallback } from 'react';
import { Node } from 'UI/GraphQL/graphqlTypes.gen';
import { Link } from 'react-router-dom';
import useRouter from 'use-react-router';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';

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

export function ManagedNodeCard({ name, id }: Node): React.ReactElement {
  const classes = useStyles({});
  const { history } = useRouter();
  const onClick = useCallback(() => history.push(`/Nodes/Node/${id}`), [id])

  return (
    <>
      <Card title={name} className={classes.card}>
        <CardActionArea onClick={onClick}>
          <CardContent>
            <Typography variant='h5' component='h2'>
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button style={{ color: 'red' }}>Delete Node</Button>
        </CardActions>
      </Card>
    </>
  );
}
