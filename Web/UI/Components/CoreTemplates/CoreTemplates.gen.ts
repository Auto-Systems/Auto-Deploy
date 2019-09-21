import * as Types from '../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const CoreTemplatesDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CoreTemplates"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"coreTemplates"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"os"},"arguments":[],"directives":[]}]}}]}}]};

    export function useCoreTemplatesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CoreTemplatesQuery, CoreTemplatesQueryVariables>) {
      return ApolloReactHooks.useQuery<CoreTemplatesQuery, CoreTemplatesQueryVariables>(CoreTemplatesDocument, baseOptions);
    }
      export function useCoreTemplatesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CoreTemplatesQuery, CoreTemplatesQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<CoreTemplatesQuery, CoreTemplatesQueryVariables>(CoreTemplatesDocument, baseOptions);
      }
      
export type CoreTemplatesQueryHookResult = ReturnType<typeof useCoreTemplatesQuery>;
export type CoreTemplatesQueryResult = ApolloReactCommon.QueryResult<CoreTemplatesQuery, CoreTemplatesQueryVariables>;export type CoreTemplatesQueryVariables = {};


export type CoreTemplatesQuery = (
  { __typename?: 'Query' }
  & { coreTemplates: Array<(
    { __typename?: 'CoreTemplate' }
    & Pick<Types.CoreTemplate, 'name' | 'id' | 'os'>
  )> }
);
