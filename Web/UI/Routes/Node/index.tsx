// Web/UI/Routes/Nodes/RequestNode.tsx
import React, { useCallback, useRef, useState } from 'react';
import { Base64Input } from 'UI/Components/Style/Buttons/Base64Input';
import { Form } from 'UI/Components/Style/Form';
import { BaseSelect } from 'UI/Components/Style/Select/BaseSelect';
import { NodeOs } from 'UI/GraphQL/graphqlTypes.gen';
import { useRequestNewNodeMutation } from './RequestNewNode.gen';

interface FormData {
  name: string;
  purpose: string;
}

export default function RequestNodeRoute(): React.ReactElement {
  const [submitNodeRequest, { error }] = useRequestNewNodeMutation();
  const [os, setOS] = useState<NodeOs>();
  const [configurationFile, setConfigurationFile] = useState<string>();
  const submitNewNodeRequest = useCallback(
    async (formData: FormData) => {
      const response = await submitNodeRequest({
        variables: { input: { ...formData, os, configurationFile } },
      });
    },
    [submitNodeRequest, os, configurationFile],
  );

  const uploadConfigurationFile = useCallback(
    (value) => setConfigurationFile(value),
    [setConfigurationFile],
  );

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
      <Base64Input onChange={uploadConfigurationFile} />
    </Form>
  );
}
