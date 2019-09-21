import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CreateCoreTemplateDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCoreTemplate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCoreTemplateInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCoreTemplate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};
export type CreateCoreTemplateMutationFn = ApolloReactCommon.MutationFunction<CreateCoreTemplateMutation, CreateCoreTemplateMutationVariables>;

    export function useCreateCoreTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateCoreTemplateMutation, CreateCoreTemplateMutationVariables>) {
      return ApolloReactHooks.useMutation<CreateCoreTemplateMutation, CreateCoreTemplateMutationVariables>(CreateCoreTemplateDocument, baseOptions);
    }
export type CreateCoreTemplateMutationHookResult = ReturnType<typeof useCreateCoreTemplateMutation>;
export type CreateCoreTemplateMutationResult = ApolloReactCommon.MutationResult<CreateCoreTemplateMutation>;
export type CreateCoreTemplateMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCoreTemplateMutation, CreateCoreTemplateMutationVariables>;export type CreateCoreTemplateMutationVariables = {
  input: Types.CreateCoreTemplateInput
};


export type CreateCoreTemplateMutation = (
  { __typename?: 'Mutation' }
  & { createCoreTemplate: (
    { __typename?: 'CoreTemplate' }
    & Pick<Types.CoreTemplate, 'name'>
  ) }
);
