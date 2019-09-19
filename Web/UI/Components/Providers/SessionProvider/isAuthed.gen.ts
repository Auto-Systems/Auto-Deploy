import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const UserCheckDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userCheck"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userCheck"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"isAuthed"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"role"},"arguments":[],"directives":[]}]}}]}}]};

    export function useUserCheckQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserCheckQuery, UserCheckQueryVariables>) {
      return ApolloReactHooks.useQuery<UserCheckQuery, UserCheckQueryVariables>(UserCheckDocument, baseOptions);
    }
      export function useUserCheckLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCheckQuery, UserCheckQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<UserCheckQuery, UserCheckQueryVariables>(UserCheckDocument, baseOptions);
      }
      
export type UserCheckQueryHookResult = ReturnType<typeof useUserCheckQuery>;
export type UserCheckQueryResult = ApolloReactCommon.QueryResult<UserCheckQuery, UserCheckQueryVariables>;export type UserCheckQueryVariables = {};


export type UserCheckQuery = (
  { __typename?: 'Query' }
  & { userCheck: (
    { __typename?: 'UserCheck' }
    & Pick<Types.UserCheck, 'isAuthed' | 'role'>
  ) }
);
