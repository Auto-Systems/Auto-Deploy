// UI/ui/lib/initApollo.tsx
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloCache } from 'apollo-cache';

interface InitClientParams {
  baseUrl: string;
  initialState?: NormalizedCacheObject;
  token?: string;
  cache?: ApolloCache<any>;
}

export const initApollo = ({
  baseUrl,
  initialState,
  token,
  cache = new InMemoryCache().restore(initialState || {})
}: InitClientParams): ApolloClient<NormalizedCacheObject> =>
  new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
    link: createHttpLink({
      uri: `${baseUrl}/graphql`,
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),
    cache: cache
  });
