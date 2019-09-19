import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ApproveNodeRequestDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveNodeRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApproveNodeRequestInput"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveNodeRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"requestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export type ApproveNodeRequestMutationFn = ApolloReactCommon.MutationFunction<ApproveNodeRequestMutation, ApproveNodeRequestMutationVariables>;

    export function useApproveNodeRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApproveNodeRequestMutation, ApproveNodeRequestMutationVariables>) {
      return ApolloReactHooks.useMutation<ApproveNodeRequestMutation, ApproveNodeRequestMutationVariables>(ApproveNodeRequestDocument, baseOptions);
    }
export type ApproveNodeRequestMutationHookResult = ReturnType<typeof useApproveNodeRequestMutation>;
export type ApproveNodeRequestMutationResult = ApolloReactCommon.MutationResult<ApproveNodeRequestMutation>;
export type ApproveNodeRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<ApproveNodeRequestMutation, ApproveNodeRequestMutationVariables>;export type ApproveNodeRequestMutationVariables = {
  input: Types.ApproveNodeRequestInput,
  requestId: Types.Scalars['String']
};


export type ApproveNodeRequestMutation = (
  { __typename?: 'Mutation' }
  & { approveNodeRequest: (
    { __typename?: 'ManagedNode' }
    & Pick<Types.ManagedNode, 'name' | 'id'>
  ) }
);
