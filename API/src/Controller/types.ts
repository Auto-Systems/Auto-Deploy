import { NodeOS } from 'API/Modules/Controllers/Nodes/NodeOS';
import { NodePower } from 'API/Modules/Controllers/Nodes/NodePower';

// API/src/Controller/types.ts
export interface Node {
  name: string;
  id: string;
  power: NodePower;
}

export interface Host {
  name: string;
  id: string;
}

export interface Network {
  name: string;
  id: string;
}

export interface Storage {
  name: string;
  id: string;
}

export interface CreateNodeInput {
  name: string;
  host: string;
  storage: string;
  network: string;
  coreTemplate: string;
}

export interface Templates {
  name: string;
  id: string;
}

export interface NodeFilter {
  names: string | string[];
}

export enum ControllerMethodENUM {
  'powerNode' = 'powerNode',
  'listNodes' = 'listNodes',
  'listHosts' = 'listHosts',
  'listNetworks' = 'listNetworks',
  'listStorage' = 'listStorage',
  'createNode' = 'createNode',
  'listTemplates' = 'listTemplates',
  'listLibraries' = 'listLibraries',
  'initController' = 'initController',
  'loginController' = 'loginController',
  'getNodeInfo' = 'getNodeInfo',
  'getLibraryItem' = 'getLibraryItem'
}

type ControllerMethod =
  | 'powerNode'
  | 'listNodes'
  | 'listHosts'
  | 'listNetworks'
  | 'listStorage'
  | 'createNode'
  | 'initController'
  | 'loginController'
  | 'listTemplates'
  | 'listLibraries'
  | 'getNodeInfo'
  | 'getLibraryItem'
  | ControllerMethodENUM;

export enum LibraryItemTypeENUM {
  'nodeTemplate' = 'nodeTemplate',
  'iso' = 'iso',
  'file' = 'file',
  'templateFile' = 'templateFile',
}

export type LibraryItemType =
  | 'nodeTemplate'
  | 'iso'
  | 'file'
  | 'templateFile'
  | LibraryItemTypeENUM;

export interface LibraryItem {
  name: string;
  id: string;
  type: LibraryItemType;
  description: string;
}

export interface Library {
  name: string;
  id: string;
  description: string;
  items: LibraryItem[];
}

export interface InitControllerParams {
  token: string;
  host: string;
}

export interface LoginControllerParams {
  username: string;
  password: string;
  host: string;
}

export interface NodeNetworkInfo {
  /**
   * IP Address or hostname for use in SSH/Provisioner connections
   */
  host: string;
}

export interface NodeInfo {
  network: NodeNetworkInfo;
  OS: NodeOS;
}

export enum PowerNodeTypeENUM {
  'start' = 'start',
  'reset' = 'reset',
  'stop' = 'stop',
  'suspend' = 'suspend',
}

export type powerNodeType =
  | 'start'
  | 'reset'
  | 'stop'
  | 'suspend'
  | PowerNodeTypeENUM;

export interface ControllerModule {
  /**
   * Power NodeID.
   */
  powerNode: (nodeId: string, state: powerNodeType) => Promise<boolean>;
  /**
   * List All Nodes
   */
  listNodes: (filter?: NodeFilter) => Promise<Node[]>;
  listHosts: (filter?: string) => Promise<Host[]>;
  listNetworks: (filter?: string) => Promise<Network[]>;
  listStorage: (filter?: string) => Promise<Storage[]>;
  initController: (params: InitControllerParams) => Promise<void>;
  /**
   * Create new managed node.
   */
  createNode: (input: CreateNodeInput) => Promise<Node>;

  /**
   * List Libraries
   */
  listLibraries: (filter?: string) => Promise<Library[]>;

  /**
   * Get Node's information, OS, Power  state, Network
   */
  getNodeInfo: (nodeId: string) => Promise<NodeInfo>;

  /**
   * Get Single Library item
   */
  getLibraryItem: (itemId: string) => Promise<LibraryItem>

  /**
   * Logs into the controller and returns a session token for use with initController for future uses of the API
   */
  loginController: (input: LoginControllerParams) => Promise<string>;
}

export interface MethodDecoratorConfiguration {
  type: ControllerMethod;
}

export interface ControllerConfiguration {
  name: string;
}

export type MethodNames = { [method in ControllerMethod]: string };

export interface ControllerClass {
  new (): ControllerModule;
}
