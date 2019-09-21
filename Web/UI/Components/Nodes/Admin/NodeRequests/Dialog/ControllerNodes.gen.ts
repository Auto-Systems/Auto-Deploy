import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const StoragesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Storages"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getControllerNodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"STORAGE"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useStoragesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StoragesQuery, StoragesQueryVariables>) {
      return ApolloReactHooks.useQuery<StoragesQuery, StoragesQueryVariables>(StoragesDocument, baseOptions);
    }
      export function useStoragesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StoragesQuery, StoragesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<StoragesQuery, StoragesQueryVariables>(StoragesDocument, baseOptions);
      }
      
export type StoragesQueryHookResult = ReturnType<typeof useStoragesQuery>;
export type StoragesQueryResult = ApolloReactCommon.QueryResult<StoragesQuery, StoragesQueryVariables>;
export const NetworksDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Networks"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getControllerNodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"NETWORK"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useNetworksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NetworksQuery, NetworksQueryVariables>) {
      return ApolloReactHooks.useQuery<NetworksQuery, NetworksQueryVariables>(NetworksDocument, baseOptions);
    }
      export function useNetworksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NetworksQuery, NetworksQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<NetworksQuery, NetworksQueryVariables>(NetworksDocument, baseOptions);
      }
      
export type NetworksQueryHookResult = ReturnType<typeof useNetworksQuery>;
export type NetworksQueryResult = ApolloReactCommon.QueryResult<NetworksQuery, NetworksQueryVariables>;
export const HostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hosts"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getControllerNodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"EnumValue","value":"HOST"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useHostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HostsQuery, HostsQueryVariables>) {
      return ApolloReactHooks.useQuery<HostsQuery, HostsQueryVariables>(HostsDocument, baseOptions);
    }
      export function useHostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HostsQuery, HostsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<HostsQuery, HostsQueryVariables>(HostsDocument, baseOptions);
      }
      
export type HostsQueryHookResult = ReturnType<typeof useHostsQuery>;
export type HostsQueryResult = ApolloReactCommon.QueryResult<HostsQuery, HostsQueryVariables>;export type StoragesQueryVariables = {};


export type StoragesQuery = (
  { __typename?: 'Query' }
  & { getControllerNodes: Array<(
    { __typename?: 'ControllerNode' }
    & Pick<Types.ControllerNode, 'name' | 'id'>
  )> }
);

export type NetworksQueryVariables = {};


export type NetworksQuery = (
  { __typename?: 'Query' }
  & { getControllerNodes: Array<(
    { __typename?: 'ControllerNode' }
    & Pick<Types.ControllerNode, 'name' | 'id'>
  )> }
);

export type HostsQueryVariables = {};


export type HostsQuery = (
  { __typename?: 'Query' }
  & { getControllerNodes: Array<(
    { __typename?: 'ControllerNode' }
    & Pick<Types.ControllerNode, 'name' | 'id'>
  )> }
);
