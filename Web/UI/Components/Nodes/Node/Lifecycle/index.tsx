// Web/UI/Components/Nodes/Node/Lifecycle/index.tsx
import React, { useState, useCallback } from 'react';
import { CreateLifecycleDialog } from './CreateLifecycleDialog';
import { BaseButton } from 'UI/Components/Style/Buttons/BaseButton';

interface NodeLifecycleProps {
  nodeId: string;
}

export function NodeLifecycle({
  nodeId,
}: NodeLifecycleProps): React.ReactElement {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = useCallback(
    (action: 'cancel' | 'submit') => () => {
      setDialogOpen(false);
    },
    [dialogOpen],
  );

  const toggleDialog = useCallback(() => setDialogOpen((state) => !state), [
    setDialogOpen,
  ]);

  return (
    <>
      <BaseButton label='Create Lifecycle' onClick={toggleDialog} />
      <CreateLifecycleDialog
        open={dialogOpen}
        onClose={handleClose}
        nodeId={nodeId}
      />
    </>
  );
}
