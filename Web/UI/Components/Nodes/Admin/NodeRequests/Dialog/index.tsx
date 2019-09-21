// Web/UI/Components/Nodes/Admin/NodeRequests/Dialog/index.tsx
import React, { useState, ChangeEvent, useCallback } from 'react';
import { FormDialog } from 'UI/Components/Style/Dialog/FormDialog';
import { useStoragesQuery } from './Storages.gen';
import { useApproveRequestMutation } from './ApproveNodeRequest.gen';
import { BaseSelect } from 'UI/Components/Style/Select/BaseSelect';
import { useNetworksQuery } from './Networks.gen';
import { useHostsQuery } from './Hosts.gen';

interface DialogProps {
  open: boolean;
  onClose: (action: 'cancel' | 'submit') => () => void;
  requestId: string;
}

interface ApproveRequestInput {
  storage: string;
  network: string;
  host: string;
}

type HandleChange = <T extends keyof ApproveRequestInput>(
  key: T,
) => (evt: ChangeEvent<{ value: ApproveRequestInput[T] }>) => void;

type GetValue = <T extends keyof ApproveRequestInput>(
  key: T,
) => ApproveRequestInput[T];

export function ApproveNodeRequestDialog({
  open,
  onClose,
  requestId,
}: DialogProps): React.ReactElement {
  const { data: storageData } = useStoragesQuery();
  const { data: hostsData } = useHostsQuery();
  const { data: networksData } = useNetworksQuery();

  const [settings, setSettings] = useState<ApproveRequestInput>({
    storage: '',
    network: '',
    host: '',
  });
  const [approveNodeRequestFN, { loading }] = useApproveRequestMutation({
    variables: { requestId, input: settings },
  });

  const getValue: GetValue = useCallback(
    (key) => (settings ? settings[key] : ''),
    [settings],
  );

  const handleChange: HandleChange = useCallback(
    (key) => ({ target }) => setSettings({ ...settings, [key]: target.value }),
    [settings],
  );

  const approveNodeRequest = useCallback(
    (action: 'cancel' | 'submit') => async () => {
      if (action === 'cancel') return;
      const { data } = await approveNodeRequestFN();
    },
    [settings],
  );

  return (
    <FormDialog
      title='Approve Node Request'
      body='Approve Node Request'
      onAction={approveNodeRequest}
      open={open}
      loading={loading}
    >
      <BaseSelect
        fullWidth
        onChange={handleChange('storage')}
        value={getValue('storage')}
        items={
          storageData && storageData.storages
            ? storageData.storages.map(({ name: label, id: value }) => ({
                label,
                value,
              }))
            : []
        }
        label='Storage'
      />
      <BaseSelect
        fullWidth
        value={getValue('host')}
        onChange={handleChange('host')}
        items={
          hostsData && hostsData.hosts
            ? hostsData.hosts.map(({ name: label, id: value }) => ({
                label,
                value,
              }))
            : []
        }
        label='Host'
      />
      <BaseSelect
        fullWidth
        onChange={handleChange('network')}
        value={getValue('network')}
        items={
          networksData && networksData.networks
            ? networksData.networks.map(({ name: label, id: value }) => ({
                label,
                value,
              }))
            : []
        }
        label='Network'
      />
    </FormDialog>
  );
}
