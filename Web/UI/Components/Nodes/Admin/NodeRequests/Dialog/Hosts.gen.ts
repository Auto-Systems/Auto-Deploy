import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const HostsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Hosts"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hosts"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useHostsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<HostsQuery, HostsQueryVariables>) {
      return ApolloReactHooks.useQuery<HostsQuery, HostsQueryVariables>(HostsDocument, baseOptions);
    }
      export function useHostsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<HostsQuery, HostsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<HostsQuery, HostsQueryVariables>(HostsDocument, baseOptions);
      }
      
export type HostsQueryHookResult = ReturnType<typeof useHostsQuery>;
export type HostsQueryResult = ApolloReactCommon.QueryResult<HostsQuery, HostsQueryVariables>;export type HostsQueryVariables = {};


export type HostsQuery = (
  { __typename?: 'Query' }
  & { hosts: Array<(
    { __typename?: 'Host' }
    & Pick<Types.Host, 'name' | 'id'>
  )> }
);
