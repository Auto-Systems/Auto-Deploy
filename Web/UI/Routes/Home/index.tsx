// UI/UI/Routes/Home/index.tsx
import { Typography, Grid } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { useStyles } from 'UI/Routes/Home/Styles';
import { BaseCard } from 'UI/Components/Style/Cards/BaseCard';
import { BlogList } from 'UI/Components/BlogList';
import { Section } from 'UI/Components/Layout/Section';

interface Feature {
  label: string;
  body: string;
}

const Features: Feature[] = [
  { label: 'React', body: 'Entire frontend is written in React' },
  { label: 'GraphQL', body: 'All communication between frontend and backend is done via GraphQL' }
];

export default function HomeRoute(): React.ReactElement {
  const classes = useStyles();

  return (
    <>
      <Section
        background='secondary'
        className={classes.topSection}
        title={{ title: 'Auto Deploy', message: 'Auto Deploy is an automated deployment and lifecycle system' }}
      />
      <section className={clsx(classes.sectionAlt, classes.mainSect)}>
        <div>
          <Typography variant='h5' gutterBottom className={clsx(classes.demoTitle)}>
            Features
          </Typography>
        </div>
        <Grid container spacing={1} justify='center' alignItems='center' direction='row'>
          {Features.map(({ label, body }, i) => (
            <Grid item key={i}>
              <BaseCard title={label} body={body} className={classes.card} />
            </Grid>
          ))}
        </Grid>
      </section>
    </>
  );
}
