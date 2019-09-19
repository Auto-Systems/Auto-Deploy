// UI/UI/Components/Layout/Forms/XYZ/index.tsx
import React, { useState, useEffect } from 'react';
import { Form } from 'UI/Components/Style/Form';
import { useMutation } from '@apollo/react-hooks';
import { ApolloError } from 'apollo-client';

/**
 * Put field types here
 */
interface FormData {
  username: string;
  password: string;
}

interface ErrorItem {
  message?: string;
  code?: string;
  invalidField?: string;
  errorMessage: string;
}

const Errors: ErrorItem[] = [
  { message: `GraphQL error: Access denied! You don't have permission for this action!`, errorMessage: 'Password is Invalid' },
  {
    code: 'INVALID_USER',
    invalidField: 'username',
    errorMessage: 'Username is invalid'
  }
];

const processError = (errorItem: ErrorItem, error: ApolloError) => {
  const Test = Object.entries(errorItem).every(([type, value]) => error[type as keyof ApolloError].includes(value));
  console.log(Test)

}

type Invalid = { Field: string; Text: string } | { Field: ''; Text: undefined };

export function LoginForm(): React.ReactElement {
  // @ts-ignore Remove this once you add your .graphql Import
  const [test, { error }] = useMutation();
  const [invalid, setInvalid] = useState<ErrorItem>();

  const onSubmit = async (data: FormData): Promise<void> => {
    // Insert Mutation here
    const response = { data: 'test' };
    if (response) window.location.href = '/';
  };

  useEffect(() => {
    if (typeof error !== 'undefined') {

      if (error.message === AuthError) setInvalid({ Field: 'password', Text: 'Password is Invalid' });
      else if (error.graphQLErrors[0].extensions && error.graphQLErrors[0].extensions.code === 'INVALID_USER')
        setInvalid({ Field: 'username', Text: 'Username is invalid' });
    }
  }, [error]);

  return (
    <Form<FormData>
      title='Login'
      invalid={invalid}
      onSubmit={onSubmit}
      Fields={[
        { label: 'Username', name: 'username', type: 'Text', inputType: 'text', autoComplete: 'username' },
        { label: 'Password', name: 'password', type: 'Text', inputType: 'password', autoComplete: 'current-password' }
      ]}
    />
  );
}
