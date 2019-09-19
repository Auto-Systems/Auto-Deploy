import * as Types from '../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const SaveInitialSettingsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"saveInitialSettings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InitialConfigurationInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initialConfiguration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[]}]}}]};
export type SaveInitialSettingsMutationFn = ApolloReactCommon.MutationFunction<SaveInitialSettingsMutation, SaveInitialSettingsMutationVariables>;

    export function useSaveInitialSettingsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveInitialSettingsMutation, SaveInitialSettingsMutationVariables>) {
      return ApolloReactHooks.useMutation<SaveInitialSettingsMutation, SaveInitialSettingsMutationVariables>(SaveInitialSettingsDocument, baseOptions);
    }
export type SaveInitialSettingsMutationHookResult = ReturnType<typeof useSaveInitialSettingsMutation>;
export type SaveInitialSettingsMutationResult = ApolloReactCommon.MutationResult<SaveInitialSettingsMutation>;
export type SaveInitialSettingsMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveInitialSettingsMutation, SaveInitialSettingsMutationVariables>;export type SaveInitialSettingsMutationVariables = {
  input: Types.InitialConfigurationInput
};


export type SaveInitialSettingsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'initialConfiguration'>
);
