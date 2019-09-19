// UI/UI/Components/Style/Box.tsx
// KristianFJones
import React, { PropsWithChildren, ReactNode, ReactElement } from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Paper, { PaperProps } from '@material-ui/core/Paper';

interface BoxProps extends PaperProps {
  title: string;
  preTitle?: React.ReactNode;
}

const useStyles = makeStyles(
  createStyles({
    box: {
      flex: '1 1 auto',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      maxWidth: '325px',
      borderRadius: '1em',
      padding: '1em',
      margin: '1.5rem'
    }
  })
);

export function Box({ title, preTitle, children, ...props }: PropsWithChildren<BoxProps>): ReactElement {
  const classes = useStyles();
  return (
    <Paper className={classes.box} elevation={7} {...props}>
      {preTitle}
      <Typography variant='h4'>{title}</Typography>
      {children}
    </Paper>
  );
}
