// Web/UI/Routes/Nodes/RequestNode.tsx
import React, { useCallback, useState } from 'react';
import { Base64Input } from 'UI/Components/Style/Buttons/Base64Input';
import { Form } from 'UI/Components/Style/Form';
import { BaseSelect } from 'UI/Components/Style/Select/BaseSelect';
import { NodeOs, Env } from 'UI/GraphQL/graphqlTypes.gen';
import { useRequestNewNodeMutation } from './RequestNewNode.gen';

interface FormData {
  name: string;
  purpose: string;
}

export default function RequestNodeRoute(): React.ReactElement {
  const [submitNodeRequest, { error }] = useRequestNewNodeMutation();
  const [os, setOS] = useState<NodeOs>();
  const [configurationFile, setConfigurationFile] = useState<string>();
  const [envFile, setENVFile] = useState<Env[]>([])
  const submitNewNodeRequest = useCallback(
    async (formData: FormData) => {
      const response = await submitNodeRequest({
        variables: { input: { ...formData, os, configurationFile, env: envFile  } },
      });
    },
    [submitNodeRequest, os, configurationFile, envFile],
  );

  const uploadConfigurationFile = useCallback(
    (value) => setConfigurationFile(value),
    [setConfigurationFile],
  );

  const uploadENVFile = useCallback(async (value) => {
    const { parse } = await import('yaml')
    setENVFile(Object.entries(parse(window.atob(value))).map(([key, value]) => ({ key, value })))
  }, [setENVFile])

  return (
    <Form<FormData>
      title='Node Request'
      submitLabel='Submit Node Request'
      onSubmit={submitNewNodeRequest}
      Fields={[
        { label: 'Node Name', name: 'name', type: 'Text', inputType: 'text' },
        {
          label: 'Node Purpose',
          name: 'purpose',
          type: 'Text',
          inputType: 'text',
        },
      ]}
    >
      <BaseSelect
        fullWidth
        onChange={({ target }) => setOS(target.value as NodeOs)}
        value={os}
        label='OS'
        items={Object.entries(NodeOs).map(([label, value]) => ({
          label,
          value,
        }))}
      />
      <Base64Input onChange={uploadConfigurationFile} label='Upload Configuration File' />
      <Base64Input onChange={uploadENVFile} label='Upload Environment File' />
    </Form>
  );
}
