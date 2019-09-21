import * as Types from '../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ManagedNodesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ManagedNodes"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"managedNodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useManagedNodesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ManagedNodesQuery, ManagedNodesQueryVariables>) {
      return ApolloReactHooks.useQuery<ManagedNodesQuery, ManagedNodesQueryVariables>(ManagedNodesDocument, baseOptions);
    }
      export function useManagedNodesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ManagedNodesQuery, ManagedNodesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ManagedNodesQuery, ManagedNodesQueryVariables>(ManagedNodesDocument, baseOptions);
      }
      
export type ManagedNodesQueryHookResult = ReturnType<typeof useManagedNodesQuery>;
export type ManagedNodesQueryResult = ApolloReactCommon.QueryResult<ManagedNodesQuery, ManagedNodesQueryVariables>;export type ManagedNodesQueryVariables = {};


export type ManagedNodesQuery = (
  { __typename?: 'Query' }
  & { managedNodes: Array<(
    { __typename?: 'ManagedNode' }
    & Pick<Types.ManagedNode, 'name' | 'id'>
  )> }
);
