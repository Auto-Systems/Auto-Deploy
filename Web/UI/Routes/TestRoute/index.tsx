// UI/UI/Routes/TestRoute/index.tsx
import React from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { useStyles } from 'UI/Routes/TestRoute/Styles';

export default function TestRoute(): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      <section className={clsx(classes.section)}>
        <Typography variant='h5' align='left' className={clsx(classes.sectionTitle)}>
          Test Route
        </Typography>
        <Typography variant='body1' align='left' gutterBottom className={clsx(classes.sectionDescriptiond)}>
          This is a test route
        </Typography>
      </section>
    </>
  );
}
