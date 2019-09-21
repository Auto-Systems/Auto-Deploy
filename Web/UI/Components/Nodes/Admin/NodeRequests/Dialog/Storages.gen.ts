import * as Types from '../../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const StoragesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Storages"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storages"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useStoragesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StoragesQuery, StoragesQueryVariables>) {
      return ApolloReactHooks.useQuery<StoragesQuery, StoragesQueryVariables>(StoragesDocument, baseOptions);
    }
      export function useStoragesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StoragesQuery, StoragesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<StoragesQuery, StoragesQueryVariables>(StoragesDocument, baseOptions);
      }
      
export type StoragesQueryHookResult = ReturnType<typeof useStoragesQuery>;
export type StoragesQueryResult = ApolloReactCommon.QueryResult<StoragesQuery, StoragesQueryVariables>;export type StoragesQueryVariables = {};


export type StoragesQuery = (
  { __typename?: 'Query' }
  & { storages: Array<(
    { __typename?: 'Storage' }
    & Pick<Types.Storage, 'name' | 'id'>
  )> }
);
