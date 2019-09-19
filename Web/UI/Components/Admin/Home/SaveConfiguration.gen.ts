import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const SaveConfigurationDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveConfiguration"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveConfigurationInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveConfiguration"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"controllerHost"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"controllerGit"},"arguments":[],"directives":[]}]}}]}}]};
export type SaveConfigurationMutationFn = ApolloReactCommon.MutationFunction<SaveConfigurationMutation, SaveConfigurationMutationVariables>;

    export function useSaveConfigurationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveConfigurationMutation, SaveConfigurationMutationVariables>) {
      return ApolloReactHooks.useMutation<SaveConfigurationMutation, SaveConfigurationMutationVariables>(SaveConfigurationDocument, baseOptions);
    }
export type SaveConfigurationMutationHookResult = ReturnType<typeof useSaveConfigurationMutation>;
export type SaveConfigurationMutationResult = ApolloReactCommon.MutationResult<SaveConfigurationMutation>;
export type SaveConfigurationMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveConfigurationMutation, SaveConfigurationMutationVariables>;export type SaveConfigurationMutationVariables = {
  input: Types.SaveConfigurationInput
};


export type SaveConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { saveConfiguration: (
    { __typename?: 'Configuration' }
    & Pick<Types.Configuration, 'id' | 'controllerHost' | 'controllerGit'>
  ) }
);
