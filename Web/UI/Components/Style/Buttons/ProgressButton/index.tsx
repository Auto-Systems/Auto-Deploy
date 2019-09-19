// UI/UI/Components/Style/Buttons/ProgressButton/index.tsx
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { BaseButton, BaseButtonProps } from 'UI/Components/Style/Buttons/BaseButton';
import { useStyles } from './Styles';

interface ProgressButtonProps extends BaseButtonProps {
  loading: boolean;
}

export function ProgressButton({ loading, label, ...props }: ProgressButtonProps): React.ReactElement {
  const classes = useStyles();

  return (
    <BaseButton label={label} {...props}>
      {loading === true && <CircularProgress size={18} className={classes.leftIcon} />}
    </BaseButton>
  );
}
