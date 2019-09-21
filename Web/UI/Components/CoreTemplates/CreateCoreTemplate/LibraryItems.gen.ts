import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const LibraryItemsDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LibraryItems"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"libraryItems"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"value"},"name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};

    export function useLibraryItemsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LibraryItemsQuery, LibraryItemsQueryVariables>) {
      return ApolloReactHooks.useQuery<LibraryItemsQuery, LibraryItemsQueryVariables>(LibraryItemsDocument, baseOptions);
    }
      export function useLibraryItemsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LibraryItemsQuery, LibraryItemsQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<LibraryItemsQuery, LibraryItemsQueryVariables>(LibraryItemsDocument, baseOptions);
      }
      
export type LibraryItemsQueryHookResult = ReturnType<typeof useLibraryItemsQuery>;
export type LibraryItemsQueryResult = ApolloReactCommon.QueryResult<LibraryItemsQuery, LibraryItemsQueryVariables>;export type LibraryItemsQueryVariables = {};


export type LibraryItemsQuery = (
  { __typename?: 'Query' }
  & { libraryItems: Array<(
    { __typename?: 'LibraryItem' }
    & { label: Types.LibraryItem['name'], value: Types.LibraryItem['id'] }
  )> }
);
