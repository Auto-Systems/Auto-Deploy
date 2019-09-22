// Web/UI/Components/Nodes/Node/Lifecycle/CreateLifecycleDialog/index.tsx
import React, { useState, ChangeEvent, useCallback } from 'react';
import { FormDialog } from 'UI/Components/Style/Dialog/FormDialog';
import { Env } from 'UI/GraphQL/graphqlTypes.gen';
import { useCreateLifecycleMutation } from './CreateLifecycle.gen';
import { Base64Input } from 'UI/Components/Style/Buttons/Base64Input';

interface DialogProps {
  open: boolean;
  onClose: (action: 'cancel' | 'submit') => () => void;
  nodeId: string;
}

export function CreateLifecycleDialog({
  open,
  onClose,
  nodeId,
}: DialogProps): React.ReactElement {
  const [lifecycleFile, setLifecycleFile] = useState<string>();
  const [envFile, setENVFile] = useState<Env>();
  const [createLifecycleFN, { loading }] = useCreateLifecycleMutation();

  const uploadLifecycleFile = useCallback((value) => setLifecycleFile(value), [
    setLifecycleFile,
  ]);

  const uploadENVFile = useCallback(
    async (value) => {
      const { parse } = await import('yaml');
      setENVFile(Object.entries(parse(window.atob(value))).map(
        ([key, value]) => ({
          key,
          value,
        }),
      ) as Env[]);
    },
    [setENVFile],
  );

  const createLifecycle = useCallback(
    (action: 'cancel' | 'submit') => async () => {
      if (action === 'cancel') onClose('cancel');
      else {
        const response = await createLifecycleFN({
          variables: { input: { nodeId, env: envFile, file: lifecycleFile } },
        });
        console.log(response)
        onClose('submit')
      }
    },
    [lifecycleFile, envFile, nodeId],
  );

  return (
    <FormDialog
      title='Create Lifecycle'
      body='Create lifecycle configuration'
      onAction={createLifecycle}
      open={open}
      loading={loading}
    >
      <Base64Input
        onChange={uploadLifecycleFile}
        label='Upload Lifecycle File'
      />
      <Base64Input onChange={uploadENVFile} label='Upload Environment File' />
    </FormDialog>
  );
}
