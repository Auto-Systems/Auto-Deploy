import * as Types from '../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const RequestNewNodeDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestNewNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitNodeRequestInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitNodeRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};
export type RequestNewNodeMutationFn = ApolloReactCommon.MutationFunction<RequestNewNodeMutation, RequestNewNodeMutationVariables>;

    export function useRequestNewNodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RequestNewNodeMutation, RequestNewNodeMutationVariables>) {
      return ApolloReactHooks.useMutation<RequestNewNodeMutation, RequestNewNodeMutationVariables>(RequestNewNodeDocument, baseOptions);
    }
export type RequestNewNodeMutationHookResult = ReturnType<typeof useRequestNewNodeMutation>;
export type RequestNewNodeMutationResult = ApolloReactCommon.MutationResult<RequestNewNodeMutation>;
export type RequestNewNodeMutationOptions = ApolloReactCommon.BaseMutationOptions<RequestNewNodeMutation, RequestNewNodeMutationVariables>;export type RequestNewNodeMutationVariables = {
  input: Types.SubmitNodeRequestInput
};


export type RequestNewNodeMutation = (
  { __typename?: 'Mutation' }
  & { submitNodeRequest: (
    { __typename?: 'NodeRequest' }
    & Pick<Types.NodeRequest, 'id' | 'name'>
  ) }
);
