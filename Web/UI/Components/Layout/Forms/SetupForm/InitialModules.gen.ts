import * as Types from '../../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const InitialModulesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"InitialModules"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"initialModules"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"label"},"name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"value"},"name":{"kind":"Name","value":"git"},"arguments":[],"directives":[]}]}}]}}]};

    export function useInitialModulesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<InitialModulesQuery, InitialModulesQueryVariables>) {
      return ApolloReactHooks.useQuery<InitialModulesQuery, InitialModulesQueryVariables>(InitialModulesDocument, baseOptions);
    }
      export function useInitialModulesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<InitialModulesQuery, InitialModulesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<InitialModulesQuery, InitialModulesQueryVariables>(InitialModulesDocument, baseOptions);
      }
      
export type InitialModulesQueryHookResult = ReturnType<typeof useInitialModulesQuery>;
export type InitialModulesQueryResult = ApolloReactCommon.QueryResult<InitialModulesQuery, InitialModulesQueryVariables>;export type InitialModulesQueryVariables = {};


export type InitialModulesQuery = (
  { __typename?: 'Query' }
  & { initialModules: Array<(
    { __typename?: 'Module' }
    & Pick<Types.Module, 'type'>
    & { label: Types.Module['name'], value: Types.Module['git'] }
  )> }
);
