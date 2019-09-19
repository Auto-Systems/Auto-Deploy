// UI/ui/Components/Dialogs/DialogBase/index.tsx
import React, { FunctionComponent } from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

interface CoreDialogProps {
  actions?: React.ReactNode;
}

interface OpenBaseDialogProps extends CoreDialogProps {
  open: boolean;
  title?: string;
  body?: string;
}

export type BaseDialogProps = OpenBaseDialogProps & DialogProps;

type BaseDialogType = FunctionComponent<BaseDialogProps>;

export const BaseDialog: BaseDialogType = ({ title, body, open, actions, children, ...props }) => {
  return (
    <Dialog open={open} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{body}</DialogContentText>
        {children}
      </DialogContent>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
};
