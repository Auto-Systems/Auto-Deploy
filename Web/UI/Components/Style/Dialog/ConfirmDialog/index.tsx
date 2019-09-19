// UI/ui/Components/Dialogs/ConfirmDialog/index.tsx
import React, { FunctionComponent } from 'react';
import { BaseButton } from 'UI/Components/Style/Buttons/BaseButton';
import { BaseDialog, BaseDialogProps } from 'UI/Components/Style/Dialog/DialogBase';
import { ProgressButton } from '../../Buttons/ProgressButton';

export type ButtonTypes = 'confirm' | 'cancel';

interface ConfirmDialogProps extends BaseDialogProps {
  onSelection: (selection: ButtonTypes) => () => any;
  loading: boolean;
}

type ConfirmDialogType = FunctionComponent<ConfirmDialogProps>;

export const ConfirmDialog: ConfirmDialogType = ({ onSelection, ...props }) => {
  return (
    <BaseDialog
      {...props}
      actions={
        <>
          <BaseButton onClick={onSelection('cancel')} mainColor='red' label='Cancel' />
          <ProgressButton loading={props.loading} onClick={onSelection('confirm')} mainColor='green' label='Submit' />
        </>
      }
    />
  );
};
