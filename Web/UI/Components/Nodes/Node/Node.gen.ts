import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ManagedNodeDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ManagedNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"managedNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"nodeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"nodeId"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"logs"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"command"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"result"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useManagedNodeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ManagedNodeQuery, ManagedNodeQueryVariables>) {
      return ApolloReactHooks.useQuery<ManagedNodeQuery, ManagedNodeQueryVariables>(ManagedNodeDocument, baseOptions);
    }
      export function useManagedNodeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ManagedNodeQuery, ManagedNodeQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ManagedNodeQuery, ManagedNodeQueryVariables>(ManagedNodeDocument, baseOptions);
      }
      
export type ManagedNodeQueryHookResult = ReturnType<typeof useManagedNodeQuery>;
export type ManagedNodeQueryResult = ApolloReactCommon.QueryResult<ManagedNodeQuery, ManagedNodeQueryVariables>;export type ManagedNodeQueryVariables = {
  nodeId: Types.Scalars['String']
};


export type ManagedNodeQuery = (
  { __typename?: 'Query' }
  & { managedNode: (
    { __typename?: 'ManagedNode' }
    & Pick<Types.ManagedNode, 'name' | 'id'>
    & { logs: Array<(
      { __typename?: 'Log' }
      & Pick<Types.Log, 'command' | 'result'>
    )> }
  ) }
);
