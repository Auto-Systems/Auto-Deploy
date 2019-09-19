import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Config } from 'UI/Components/Providers/ConfigProvider';

export interface Source {
  src: string;
  type: 'script' | 'style';
}

export interface AppState {
  PROPS: any;
  APOLLO_STATE: NormalizedCacheObject;
  CONFIG: Config;
}
