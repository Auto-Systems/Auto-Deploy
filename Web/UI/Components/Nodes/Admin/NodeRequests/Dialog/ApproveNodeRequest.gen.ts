import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ApproveRequestDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ApproveRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ApproveNodeRequestInput"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"approveNodeRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"requestId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"requestId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};
export type ApproveRequestMutationFn = ApolloReactCommon.MutationFunction<ApproveRequestMutation, ApproveRequestMutationVariables>;

    export function useApproveRequestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ApproveRequestMutation, ApproveRequestMutationVariables>) {
      return ApolloReactHooks.useMutation<ApproveRequestMutation, ApproveRequestMutationVariables>(ApproveRequestDocument, baseOptions);
    }
export type ApproveRequestMutationHookResult = ReturnType<typeof useApproveRequestMutation>;
export type ApproveRequestMutationResult = ApolloReactCommon.MutationResult<ApproveRequestMutation>;
export type ApproveRequestMutationOptions = ApolloReactCommon.BaseMutationOptions<ApproveRequestMutation, ApproveRequestMutationVariables>;export type ApproveRequestMutationVariables = {
  input: Types.ApproveNodeRequestInput,
  requestId: Types.Scalars['String']
};


export type ApproveRequestMutation = (
  { __typename?: 'Mutation' }
  & { approveNodeRequest: (
    { __typename?: 'ManagedNode' }
    & Pick<Types.ManagedNode, 'name'>
  ) }
);
