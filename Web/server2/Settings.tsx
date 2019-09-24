// UI/server/Settings.tsx
import { ApolloClient } from 'apollo-client';
import IS_SETUP_COMPLETE_GQL from './getSetupCompleted.graphql';
import GET_SETTINGS_GQL from './getSettings.graphql';

const API_SECRET = process.env['API_SECRET'] || '1234567';

let cacheSetup = false;

export const checkIsSetup = async (client: ApolloClient<any>): Promise<boolean> => {
  const {
    data: { getSetupCompleted: isSetup }
  } = await client.query<{ getSetupCompleted: boolean }>({
    query: IS_SETUP_COMPLETE_GQL,
    variables: { secret: API_SECRET },
    fetchPolicy: cacheSetup ? 'cache-only' : 'network-only'
  });
  if (isSetup && cacheSetup !== true) cacheSetup = true;
  return isSetup;
};

interface Settings {
  appName?: string;
}

let cacheConfig = false;
export const getConfig = async (client: ApolloClient<any>): Promise<Settings> => {
  const {
    data: { getSettings }
  } = await client.query<{ getSettings: Settings }>({
    query: GET_SETTINGS_GQL,
    variables: { secret: API_SECRET },
    fetchPolicy: cacheConfig ? 'cache-only' : 'network-only'
  });
  if (getSettings && getSettings.appName && getSettings.appName.length > 0) cacheConfig = true;
  return getSettings;
};
