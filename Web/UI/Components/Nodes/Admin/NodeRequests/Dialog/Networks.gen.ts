import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const NetworksDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Networks"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useNetworksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NetworksQuery, NetworksQueryVariables>) {
      return ApolloReactHooks.useQuery<NetworksQuery, NetworksQueryVariables>(NetworksDocument, baseOptions);
    }
      export function useNetworksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NetworksQuery, NetworksQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<NetworksQuery, NetworksQueryVariables>(NetworksDocument, baseOptions);
      }
      
export type NetworksQueryHookResult = ReturnType<typeof useNetworksQuery>;
export type NetworksQueryResult = ApolloReactCommon.QueryResult<NetworksQuery, NetworksQueryVariables>;export type NetworksQueryVariables = {};


export type NetworksQuery = (
  { __typename?: 'Query' }
  & { networks: Array<(
    { __typename?: 'Network' }
    & Pick<Types.Network, 'name' | 'id'>
  )> }
);
