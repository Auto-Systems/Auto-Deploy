// UI/UI/Components/Layout/Forms/LoginForm/index.tsx
import React, {
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  useMemo,
} from 'react';
import { Form } from 'UI/Components/Style/Form';
import { ApolloError } from 'apollo-client';
import { useSaveInitialSettingsMutation } from './saveInitialSettings.gen';
import { useInitialModulesQuery } from './InitialModules.gen';
import { BaseSelect } from 'UI/Components/Style/Select/BaseSelect';
import { ModuleType } from 'UI/GraphQL/graphqlTypes.gen';

interface FormData {
  controllerConnection: string;
  username: string;
}

interface Value {
  initialControllerGit: string;
  initialProvisionerGit: string;
}

interface ErrorItem {
  message?: string;
  code?: string;
  invalidField?: string;
  errorMessage: string;
}

type HandleChange = <T extends keyof Value>(
  key: T,
) => (evt: ChangeEvent<{ value: Value[T] }>) => void;

type GetValue = <T extends keyof Value>(key: T) => Value[T];

const Errors: ErrorItem[] = [];

const processError = ({
  graphQLErrors,
}: ApolloError): ErrorItem | undefined => {
  for (const error of graphQLErrors) {
    const Item = Errors.find((itm) =>
      Object.entries(error).some(([type, value]) =>
        value !== 'null' && typeof value === 'object'
          ? Object.entries(value).some(
              ([type, value]) =>
                typeof itm[type as keyof ErrorItem] !== 'undefined' &&
                itm[type as keyof ErrorItem] === value,
            )
          : typeof itm[type as keyof ErrorItem] !== 'undefined' &&
            itm[type as keyof ErrorItem] === value,
      ),
    );
    if (Item) return Item;
  }
  return undefined;
};

export function SetupForm(): React.ReactElement {
  const { data: initialModulesData } = useInitialModulesQuery();
  const [saveSettingsFN, { error }] = useSaveInitialSettingsMutation();
  const [invalid, setInvalid] = useState<ErrorItem>();
  const [value, setValue] = useState<Value>({
    initialControllerGit: '',
    initialProvisionerGit: '',
  });

  const handleChange: HandleChange = useCallback(
    (key) => ({ target }) => setValue({ ...value, [key]: target.value }),
    [setValue, value],
  );
  const getValue: GetValue = useCallback((key) => value[key], [value]);

  const handleSubmit = useCallback(
    async (data: FormData) => {
      const response = await saveSettingsFN({
        variables: { input: { ...data, ...value } },
      });

      if (response) window.location.href = '/';
    },
    [value, saveSettingsFN],
  );

  const { controllers, provisioners } = useMemo(() => {
    if (!initialModulesData || !initialModulesData.initialModules)
      return { controllers: [], provisioners: [] };
    else
      return {
        controllers: initialModulesData.initialModules.filter(
          ({ type }) => type === ModuleType.Controller,
        ),
        provisioners: initialModulesData.initialModules.filter(
          ({ type }) => type === ModuleType.Provisioner,
        ),
      };
  }, [initialModulesData]);

  useEffect(() => {
    if (typeof error !== 'undefined') setInvalid(processError(error));
  }, [error]);

  return (
    <Form<FormData>
      title='Setup'
      submitLabel='Setup Application'
      invalid={invalid}
      onSubmit={handleSubmit}
      Fields={[
        {
          label: 'Controller Connection',
          name: 'controllerConnection',
          type: 'Text',
          inputType: 'text',
        },
        {
          label: 'Username',
          name: 'username',
          type: 'Text',
          inputType: 'text',
          autoComplete: 'username',
        }
      ]}
    >
      <BaseSelect
        label='Initial Controller'
        fullWidth
        value={getValue('initialControllerGit')}
        onChange={handleChange('initialControllerGit')}
        items={controllers}
      />
      <BaseSelect
        label='Initial Provisioner'
        fullWidth
        value={getValue('initialProvisionerGit')}
        onChange={handleChange('initialProvisionerGit')}
        items={provisioners}
      />
    </Form>
  );
}
