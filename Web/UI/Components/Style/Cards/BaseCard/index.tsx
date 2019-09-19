// UI/UI/Components/Style/Cards/BaseCard/index.tsx
import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Card, CardContent, Typography } from '@material-ui/core';
import { useCardStyles } from 'UI/Components/Style/Cards/BaseCard/Styles';

interface CardTitle {
  title: string;
  subTitle: string;
}

type Title = string | CardTitle;

interface CardTitleProps {
  title: Title;
}

export interface BaseCardProps {
  title?: Title;
  fullWidth?: boolean;
  className?: string;
  body: string;
}

function CardTitle({ title }: CardTitleProps): React.ReactElement {
  if (typeof title === 'string')
    return (
      <Typography variant='h5' component='h2'>
        {title}
      </Typography>
    );
  return (
    <>
      <Typography variant='h5' component='h2'>
        {title.title}
      </Typography>
      <Typography color='textSecondary'>{title.subTitle}</Typography>
    </>
  );
}

export function BaseCard(props: PropsWithChildren<BaseCardProps>): React.ReactElement {
  const classes = useCardStyles(props);
  return (
    <Card className={clsx(classes.card, props.className)}>
      <CardContent>
        {props.title && <CardTitle title={props.title} />}
        <Typography variant='body2' component='p'>
          {props.body}
        </Typography>
      </CardContent>
    </Card>
  );
}
