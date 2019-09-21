export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type ApproveNodeRequestInput = {
  storage: Scalars['String'],
  network: Scalars['String'],
  host: Scalars['String'],
};

export type AuthOutput = {
   __typename?: 'AuthOutput',
  token: Scalars['String'],
  success: Scalars['Boolean'],
  role: Array<UserRole>,
};

export type Configuration = {
   __typename?: 'Configuration',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  controllerHost?: Maybe<Scalars['String']>,
};

export type ConfigurationInput = {
  username: Scalars['String'],
  activeControllerId: Scalars['Int'],
};

export type Controller = {
   __typename?: 'Controller',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  active: Scalars['Boolean'],
  name: Scalars['String'],
};

export type CoreNode = {
  name: Scalars['String'],
  id: Scalars['String'],
};

export type CoreTemplate = {
   __typename?: 'CoreTemplate',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  os: NodeOs,
  nodeAuth: NodeAuth,
  itemID: Scalars['String'],
};

export type CreateCoreTemplateInput = {
  itemID: Scalars['String'],
  name: Scalars['String'],
  os: NodeOs,
  nodeAuth: NodeAuthInput,
};

export type CreateLifecycleInput = {
  nodeId: Scalars['String'],
  env: Array<Lcenv>,
  file: Scalars['String'],
};

export type CreateNodeInput = {
  name: Scalars['String'],
  network: Scalars['String'],
  host: Scalars['String'],
  storage: Scalars['String'],
  coreTemplate: Scalars['Float'],
};


export type Env = {
  key: Scalars['String'],
  value: Scalars['String'],
};

export type Host = CoreNode & {
   __typename?: 'Host',
  name: Scalars['String'],
  id: Scalars['String'],
};

export type InitialConfigurationInput = {
  username: Scalars['String'],
  controllerConnection: Scalars['String'],
  initialControllerGit: Scalars['String'],
  initialProvisionerGit: Scalars['String'],
};

export type InitialModule = {
   __typename?: 'InitialModule',
  name: Scalars['String'],
  git: Scalars['String'],
};

export type Lcenv = {
  key: Scalars['String'],
  value: Scalars['String'],
};

export type Library = {
   __typename?: 'Library',
  name: Scalars['String'],
  id: Scalars['String'],
  description: Scalars['String'],
  items: Array<LibraryItem>,
};


export type LibraryItemsArgs = {
  filter?: Maybe<LibraryItemFilter>
};

export type LibraryItem = {
   __typename?: 'LibraryItem',
  name: Scalars['String'],
  id: Scalars['String'],
  type: LibraryItemType,
  description: Scalars['String'],
};

export type LibraryItemFilter = {
  name?: Maybe<Scalars['String']>,
  type?: Maybe<LibraryItemType>,
};

export enum LibraryItemType {
  NodeTemplate = 'nodeTemplate',
  Iso = 'iso',
  File = 'file',
  TemplateFile = 'templateFile'
}

export type Lifecycle = {
   __typename?: 'Lifecycle',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  node: ManagedNode,
};

export type LoginInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export type ManagedNode = {
   __typename?: 'ManagedNode',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  coreTemplate: CoreTemplate,
  /** Controller's Node ID */
  node: Scalars['String'],
  helloWorld: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  login: AuthOutput,
  initialConfiguration: Scalars['Boolean'],
  addUser: Scalars['Boolean'],
  saveConfiguration: Configuration,
  downloadController: Scalars['Boolean'],
  createCoreTemplate: CoreTemplate,
  createNode: ManagedNode,
  approveNodeRequest: ManagedNode,
  getMyNodeRequests: Array<NodeRequest>,
  submitNodeRequest: NodeRequest,
  createLifecycle: Scalars['Boolean'],
  startLifecycle: Scalars['String'],
  provisionNode: Scalars['Boolean'],
  testAuth: Scalars['String'],
  uploadConfiguration: Scalars['String'],
};


export type MutationLoginArgs = {
  input: LoginInput
};


export type MutationInitialConfigurationArgs = {
  input: InitialConfigurationInput
};


export type MutationAddUserArgs = {
  username: Scalars['String']
};


export type MutationSaveConfigurationArgs = {
  input: SaveConfigurationInput
};


export type MutationDownloadControllerArgs = {
  git: Scalars['String']
};


export type MutationCreateCoreTemplateArgs = {
  input: CreateCoreTemplateInput
};


export type MutationCreateNodeArgs = {
  input: CreateNodeInput
};


export type MutationApproveNodeRequestArgs = {
  input: ApproveNodeRequestInput,
  requestId: Scalars['String']
};


export type MutationSubmitNodeRequestArgs = {
  input: SubmitNodeRequestInput
};


export type MutationCreateLifecycleArgs = {
  input: CreateLifecycleInput
};


export type MutationStartLifecycleArgs = {
  nodeId: Scalars['String']
};


export type MutationProvisionNodeArgs = {
  nodeId: Scalars['String']
};


export type MutationTestAuthArgs = {
  command: Scalars['String'],
  nodeId: Scalars['String']
};


export type MutationUploadConfigurationArgs = {
  env: Array<Env>,
  file: Scalars['String'],
  nodeId: Scalars['String']
};

export type Network = CoreNode & {
   __typename?: 'Network',
  name: Scalars['String'],
  id: Scalars['String'],
};

/** Auto Deploy Node */
export type Node = CoreNode & {
   __typename?: 'Node',
  name: Scalars['String'],
  id: Scalars['String'],
  power: NodePower,
};

export type NodeAuth = {
   __typename?: 'NodeAuth',
  username: Scalars['String'],
  password: Scalars['String'],
};

export type NodeAuthInput = {
  username: Scalars['String'],
  password: Scalars['String'],
};

export enum NodeOs {
  Ubuntu = 'UBUNTU',
  Debian = 'DEBIAN'
}

export enum NodePower {
  On = 'ON',
  Off = 'OFF',
  Suspended = 'SUSPENDED'
}

export type NodeRequest = {
   __typename?: 'NodeRequest',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  name: Scalars['String'],
  user: User,
  os: NodeOs,
  purpose: Scalars['String'],
  configurationFile?: Maybe<Scalars['String']>,
  state: NodeRequestState,
};

export enum NodeRequestState {
  Submitted = 'SUBMITTED',
  Approved = 'APPROVED',
  Denied = 'DENIED'
}

export type Provisioner = {
   __typename?: 'Provisioner',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  active: Scalars['Boolean'],
  name: Scalars['String'],
};

export type Query = {
   __typename?: 'Query',
  userCheck: UserCheck,
  configuration: Configuration,
  getInitialControllers: Array<InitialModule>,
  getIntialProvisioners: Array<InitialModule>,
  getSetupCompleted: Scalars['Boolean'],
  controllers: Array<Controller>,
  coreTemplates: Array<CoreTemplate>,
  hosts: Array<Host>,
  libraries: Array<Library>,
  libraryItem: LibraryItem,
  getAllManagedNodes: Array<ManagedNode>,
  managedNodes: Array<ManagedNode>,
  nodeRequests: Array<NodeRequest>,
  networks: Array<Network>,
  /** Returns nodes from active controller module */
  nodes: Array<Maybe<Node>>,
  testNodeStuff: Scalars['Boolean'],
  storages: Array<Storage>,
  testConfig: Scalars['Boolean'],
};


export type QueryGetSetupCompletedArgs = {
  secret: Scalars['String']
};


export type QueryLibraryItemArgs = {
  id: Scalars['String']
};


export type QueryTestNodeStuffArgs = {
  nodeId: Scalars['String']
};


export type QueryTestConfigArgs = {
  id: Scalars['String']
};

export type SaveConfigurationInput = {
  controllerHost: Scalars['String'],
};

export type Storage = CoreNode & {
   __typename?: 'Storage',
  name: Scalars['String'],
  id: Scalars['String'],
};

export type SubmitNodeRequestInput = {
  name: Scalars['String'],
  os: NodeOs,
  purpose: Scalars['String'],
  configurationFile?: Maybe<Scalars['String']>,
  env?: Maybe<Array<Env>>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  username: Scalars['String'],
};

export type UserCheck = {
   __typename?: 'UserCheck',
  isAuthed: Scalars['Boolean'],
  role: Array<UserRole>,
};

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN'
}
export type ConfigurationQueryVariables = {};


export type ConfigurationQuery = (
  { __typename?: 'Query' }
  & { configuration: (
    { __typename?: 'Configuration' }
    & Pick<Configuration, 'id'>
  ) }
);

export type SaveConfigurationMutationVariables = {
  input: SaveConfigurationInput
};


export type SaveConfigurationMutation = (
  { __typename?: 'Mutation' }
  & { saveConfiguration: (
    { __typename?: 'Configuration' }
    & Pick<Configuration, 'id'>
  ) }
);

export type NodeRequestsQueryVariables = {};


export type NodeRequestsQuery = (
  { __typename?: 'Query' }
  & { nodeRequests: Array<(
    { __typename?: 'NodeRequest' }
    & Pick<NodeRequest, 'name' | 'purpose' | 'id' | 'createdAt' | 'configurationFile'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ) }
  )> }
);

export type SaveInitialSettingsMutationVariables = {
  input: InitialConfigurationInput
};


export type SaveInitialSettingsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'initialConfiguration'>
);

export type ApproveNodeRequestMutationVariables = {
  input: ApproveNodeRequestInput,
  requestId: Scalars['String']
};


export type ApproveNodeRequestMutation = (
  { __typename?: 'Mutation' }
  & { approveNodeRequest: (
    { __typename?: 'ManagedNode' }
    & Pick<ManagedNode, 'name' | 'id'>
  ) }
);

export type ApproveRequestMutationVariables = {
  input: ApproveNodeRequestInput,
  requestId: Scalars['String']
};


export type ApproveRequestMutation = (
  { __typename?: 'Mutation' }
  & { approveNodeRequest: (
    { __typename?: 'ManagedNode' }
    & Pick<ManagedNode, 'name'>
  ) }
);

export type HostsQueryVariables = {};


export type HostsQuery = (
  { __typename?: 'Query' }
  & { hosts: Array<(
    { __typename?: 'Host' }
    & Pick<Host, 'name' | 'id'>
  )> }
);

export type NetworksQueryVariables = {};


export type NetworksQuery = (
  { __typename?: 'Query' }
  & { networks: Array<(
    { __typename?: 'Network' }
    & Pick<Network, 'name' | 'id'>
  )> }
);

export type StoragesQueryVariables = {};


export type StoragesQuery = (
  { __typename?: 'Query' }
  & { storages: Array<(
    { __typename?: 'Storage' }
    & Pick<Storage, 'name' | 'id'>
  )> }
);

export type UserCheckQueryVariables = {};


export type UserCheckQuery = (
  { __typename?: 'Query' }
  & { userCheck: (
    { __typename?: 'UserCheck' }
    & Pick<UserCheck, 'isAuthed' | 'role'>
  ) }
);

export type LoginMutationVariables = {
  input: LoginInput
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthOutput' }
    & Pick<AuthOutput, 'success' | 'token' | 'role'>
  ) }
);

export type ManagedNodesQueryVariables = {};


export type ManagedNodesQuery = (
  { __typename?: 'Query' }
  & { managedNodes: Array<(
    { __typename?: 'ManagedNode' }
    & Pick<ManagedNode, 'name'>
  )> }
);

export type RequestNewNodeMutationVariables = {
  input: SubmitNodeRequestInput
};


export type RequestNewNodeMutation = (
  { __typename?: 'Mutation' }
  & { submitNodeRequest: (
    { __typename?: 'NodeRequest' }
    & Pick<NodeRequest, 'id' | 'name'>
  ) }
);
