import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CreateLifecycleDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLifecycle"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLifecycleInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLifecycle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[]}]}}]};
export type CreateLifecycleMutationFn = ApolloReactCommon.MutationFunction<CreateLifecycleMutation, CreateLifecycleMutationVariables>;

    export function useCreateLifecycleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLifecycleMutation, CreateLifecycleMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateLifecycleMutation, CreateLifecycleMutationVariables>(CreateLifecycleDocument, baseOptions);
    }
export type CreateLifecycleMutationHookResult = ReturnType<typeof useCreateLifecycleMutation>;
export type CreateLifecycleMutationResult = ApolloReactCommon.MutationResult<CreateLifecycleMutation>;
export type CreateLifecycleMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateLifecycleMutation, CreateLifecycleMutationVariables>;export type CreateLifecycleMutationVariables = {
  input: Types.CreateLifecycleInput
};


export type CreateLifecycleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'createLifecycle'>
);
