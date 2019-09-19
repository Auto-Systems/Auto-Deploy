// UI/UI/Components/Layout/Forms/LoginForm/index.tsx
import React, { useState, useEffect } from 'react';
import { Form } from 'UI/Components/Style/Form';
import { ApolloError } from 'apollo-client';
import { useSaveInitialSettingsMutation } from './saveInitialSettings.gen'
import { useMutation } from '@apollo/react-hooks';
import SAVE_INITIAL_SETTINGS_GQL from './saveInitialSettings.graphql';

interface FormData {
  controllerConnection: string;
  username: string;
}

interface ErrorItem {
  message?: string;
  code?: string;
  invalidField?: string;
  errorMessage: string;
}

const Errors: ErrorItem[] = [];

const processError = ({ graphQLErrors }: ApolloError): ErrorItem | undefined => {
  for (const error of graphQLErrors) {
    const Item = Errors.find(itm =>
      Object.entries(error).some(([type, value]) =>
        value !== 'null' && typeof value === 'object'
          ? Object.entries(value).some(
              ([type, value]) => typeof itm[type as keyof ErrorItem] !== 'undefined' && itm[type as keyof ErrorItem] === value
            )
          : typeof itm[type as keyof ErrorItem] !== 'undefined' && itm[type as keyof ErrorItem] === value
      )
    );
    if (Item) return Item;
  }
  return undefined;
};

export function SetupForm(): React.ReactElement {
  const [saveSettingsFN, { error }] = useSaveInitialSettingsMutation()
  const [invalid, setInvalid] = useState<ErrorItem>();
  const [controllerId, setControllerId] = useState<number>(1)
  const onSubmit = async (data: FormData): Promise<void> => {
    const response = await saveSettingsFN({ variables: { input: { ...data, activeControllerId: controllerId } } });
    if (response) window.location.href = '/';
  };

  useEffect(() => {
    if (typeof error !== 'undefined') setInvalid(processError(error));
  }, [error]);

  return (
    <Form<FormData>
      title='Setup'
      submitLabel='Setup Application'
      invalid={invalid}
      onSubmit={onSubmit}
      Fields={[
        { label: 'Controller Connection', name: 'controllerConnection', type: 'Text', inputType: 'text' },
        { label: 'Username', name: 'username', type: 'Text', inputType: 'text', autoComplete: 'username' },
        { label: 'Password', name: 'password', type: 'Text', inputType: 'password', autoComplete: 'new-password' }
      ]}
    />
  );
}
