// UI/ui/Components/Styles/Alert/index.tsx
import React, { FunctionComponent } from 'react';
import { useTheme, CSSProperties } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import { green } from '@material-ui/core/colors';

export interface AlertProps {
  open: boolean;
  message: string;
  success: boolean;
}

type AlertType = FunctionComponent<AlertProps>;

export const Alert: AlertType = ({ success, message, ...props }) => {
  const theme = useTheme<Theme>();
  const Icon = success ? CheckCircleIcon : ErrorIcon;

  const snackbarContentStyle: CSSProperties = success
    ? { backgroundColor: green[600] }
    : { backgroundColor: theme.palette.error.dark };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        {...props}
      >
        <SnackbarContent
          style={{ ...snackbarContentStyle }}
          message={
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Icon style={{ marginRight: theme.spacing(1) }} />
              {message}
            </span>
          }
        />
      </Snackbar>
    </>
  );
};
