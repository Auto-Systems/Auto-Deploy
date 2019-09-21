// Web/UI/Components/CoreTemplates/CreateCoreTemplate/index.tsx
import React, { useState, useCallback } from 'react';
import { Form } from 'UI/Components/Style/Form';
import { NodeOs } from 'UI/GraphQL/graphqlTypes.gen';
import { BaseSelect } from 'UI/Components/Style/Select/BaseSelect';
import { AutoSuggest } from 'UI/Components/Style/TextField/AutoSuggest';
import { useLibraryItemsQuery } from './LibraryItems.gen';
import { useCreateCoreTemplateMutation } from './CreateCoreTemplate.gen';
import useRouter from 'use-react-router';

interface FormData {
  name: string;
  nodeAuth: {
    username: string;
    password: string;
  };
}

export function CreateCoreTemplatePage(): React.ReactElement {
  const { history } = useRouter()
  const [itemID, setItemID] = useState<string>();
  const { data: itemsData } = useLibraryItemsQuery();
  const [os, setOS] = useState<NodeOs>();
  const [createCoreTemplateFN] = useCreateCoreTemplateMutation();

  const createCoreTemplate = useCallback(
    async (formData: FormData) => {
      const response = await createCoreTemplateFN({
        variables: { input: { ...formData, itemID, os } },
      });
      if (response && response.data) history.push('/')
    },
    [itemID, os, createCoreTemplateFN],
  );
  const selectItem = useCallback((option) => setItemID(option), [setItemID]);

  return (
    <Form<FormData>
      title='Create Core Template'
      onSubmit={createCoreTemplate}
      Fields={[
        { label: 'Name', name: 'name', type: 'Text', inputType: 'text' },
        {
          label: 'Template Username',
          name: 'nodeAuth.username',
          type: 'Text',
          inputType: 'text',
        },
        {
          label: 'Template Password',
          name: 'nodeAuth.password',
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

      <AutoSuggest
        label='Library Item'
        initialOptions={
          itemsData && itemsData.libraryItems ? itemsData.libraryItems : []
        }
        onOption={selectItem}
      />
    </Form>
  );
}
