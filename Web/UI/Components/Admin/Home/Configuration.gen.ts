import * as Types from '../../../GraphQL/graphqlTypes.gen';

import { DocumentNode } from 'graphql';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export const ConfigurationDocument: DocumentNode = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Configuration"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"configuration"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"controllerHost"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"controllerGit"},"arguments":[],"directives":[]}]}}]}}]};

    export function useConfigurationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
      return ApolloReactHooks.useQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, baseOptions);
    }
      export function useConfigurationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ConfigurationQuery, ConfigurationQueryVariables>) {
        return ApolloReactHooks.useLazyQuery<ConfigurationQuery, ConfigurationQueryVariables>(ConfigurationDocument, baseOptions);
      }
      
export type ConfigurationQueryHookResult = ReturnType<typeof useConfigurationQuery>;
export type ConfigurationQueryResult = ApolloReactCommon.QueryResult<ConfigurationQuery, ConfigurationQueryVariables>;export type ConfigurationQueryVariables = {};


export type ConfigurationQuery = (
  { __typename?: 'Query' }
  & { configuration: (
    { __typename?: 'Configuration' }
    & Pick<Types.Configuration, 'id' | 'controllerHost' | 'controllerGit'>
  ) }
);
