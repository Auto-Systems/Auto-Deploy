// UI/UI/Components/Layout/Forms/LoginForm/index.tsx
import React, { useState, useEffect } from 'react';
import { useLogin } from 'UI/Components/Providers/SessionProvider';
import { Form } from 'UI/Components/Style/Form';
import { ApolloError } from 'apollo-client';
import useRouter from 'use-react-router'

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
  {
    message: `Access denied! You don't have permission for this action!`,
    errorMessage: 'Password is Invalid',
    invalidField: 'password'
  },
  {
    code: 'INVALID_USER',
    invalidField: 'username',
    errorMessage: 'Username is invalid'
  }
];

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

export function LoginForm(): React.ReactElement {
  const [loginUser, { error }] = useLogin();
  const [invalid, setInvalid] = useState<ErrorItem>();
  const { history } = useRouter();
  const onSubmit = async (data: FormData): Promise<void> => {
    const response = await loginUser(data);
    if (response) history.push('/');
  };

  useEffect(() => {
    if (typeof error !== 'undefined') setInvalid(processError(error));
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
