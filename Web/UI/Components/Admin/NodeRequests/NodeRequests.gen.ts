import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const NodeRequestsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NodeRequests"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodeRequests"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"purpose"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"createdAt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"configurationFile"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]}]}}]}}]}}]};

    export function useNodeRequestsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NodeRequestsQuery, NodeRequestsQueryVariables>) {
      return ApolloReactHooks.useQuery<NodeRequestsQuery, NodeRequestsQueryVariables>(NodeRequestsDocument, baseOptions);
    }
      export function useNodeRequestsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NodeRequestsQuery, NodeRequestsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<NodeRequestsQuery, NodeRequestsQueryVariables>(NodeRequestsDocument, baseOptions);
      }
      
export type NodeRequestsQueryHookResult = ReturnType<typeof useNodeRequestsQuery>;
export type NodeRequestsQueryResult = ApolloReactCommon.QueryResult<NodeRequestsQuery, NodeRequestsQueryVariables>;export type NodeRequestsQueryVariables = {};


export type NodeRequestsQuery = (
  { __typename?: 'Query' }
  & { nodeRequests: Array<(
    { __typename?: 'NodeRequest' }
    & Pick<Types.NodeRequest, 'name' | 'purpose' | 'id' | 'createdAt' | 'configurationFile'>
    & { user: (
      { __typename?: 'User' }
      & Pick<Types.User, 'username'>
    ) }
  )> }
);
