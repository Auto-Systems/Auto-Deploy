// Web/UI/Components/Settings/PaperSection.tsx
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { CSSProperties, PropsWithChildren } from 'react';
import { Section } from 'UI/Components/Layout/Section';

interface PaperSectionProps {
  title: string;
  description: string;
  style?: CSSProperties;
}

export function PaperSection(
  props: PropsWithChildren<PaperSectionProps>
): React.ReactElement {
  return (
    <Section>
      <Paper
        style={{
          width: '100%',
          padding: '1em',
          margin: '1em',
          position: 'relative',
          ...props.style
        }}
      >
        <Typography variant="h4">{props.title}</Typography>
        <Typography variant="body1">{props.description}</Typography>

        {props.children}
      </Paper>
    </Section>
  );
}
