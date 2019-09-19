// UI/ui/Components/Dialogs/FormDialog/index.tsx
import React, { FunctionComponent } from 'react';
import { BaseButton } from 'UI/Components/Style/Buttons/BaseButton';
import { BaseDialog, BaseDialogProps } from 'UI/Components/Style/Dialog/DialogBase';
import { ProgressButton } from '../../Buttons/ProgressButton';

interface FormDialogProps extends BaseDialogProps {
  onAction: (action: 'cancel' | 'submit') => () => any;
  loading: boolean;
}

type FormDialogType = FunctionComponent<FormDialogProps>;

export const FormDialog: FormDialogType = ({ title, body, open, children, onAction, ...props }) => {
  return (
    <BaseDialog
      open={open}
      title={title}
      body={body}
      PaperProps={{
        style: {
          maxWidth: '325px'
        }
      }}
      actions={
        <>
          <BaseButton onClick={onAction('cancel')} mainColor='red' label='Cancel' />
          <ProgressButton loading={props.loading} onClick={onAction('submit')} mainColor='green' label='Submit' />
        </>
      }
      {...props}
    >
      {children}
    </BaseDialog>
  );
};
