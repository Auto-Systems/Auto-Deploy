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

export type BaseCoreNode = {
  name: Scalars['String'],
  id: Scalars['String'],
};

export type CommandResult = {
   __typename?: 'CommandResult',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  command: Scalars['String'],
  result: Scalars['String'],
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

export type ControllerNode = BaseCoreNode & {
   __typename?: 'ControllerNode',
  name: Scalars['String'],
  id: Scalars['String'],
};

export enum ControllerxNodeTypes {
  Network = 'NETWORK',
  Storage = 'STORAGE',
  Host = 'HOST',
  CoreTemplate = 'CORE_TEMPLATE'
}

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


export type Env = {
  key: Scalars['String'],
  value: Scalars['String'],
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

export type Log = {
   __typename?: 'Log',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  commandResults: Array<CommandResult>,
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
  logs: Array<Log>,
};

export type Module = {
   __typename?: 'Module',
  type: ModuleType,
  name: Scalars['String'],
  git: Scalars['String'],
};

export enum ModuleType {
  Controller = 'CONTROLLER',
  Provisioner = 'PROVISIONER'
}

export type Mutation = {
   __typename?: 'Mutation',
  login: AuthOutput,
  initialConfiguration: Scalars['Boolean'],
  addUser: Scalars['Boolean'],
  saveConfiguration: Configuration,
  downloadController: Scalars['Boolean'],
  createCoreTemplate: CoreTemplate,
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
  coreTemplate: CoreTemplate,
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
  initialModules: Array<Module>,
  getControllerNodes: Array<ControllerNode>,
  getControllerNode: ControllerNode,
  controllers: Array<Controller>,
  coreTemplates: Array<CoreTemplate>,
  libraries: Array<Library>,
  libraryItem: LibraryItem,
  libraryItems: Array<LibraryItem>,
  getAllManagedNodes: Array<ManagedNode>,
  managedNodes: Array<ManagedNode>,
  managedNode: ManagedNode,
  nodeRequests: Array<NodeRequest>,
  /** Returns nodes from active controller module */
  nodes: Array<Maybe<Node>>,
  testNodeStuff: Scalars['Boolean'],
  lsFiles: Scalars['Boolean'],
  testConfig: Scalars['Boolean'],
};


export type QueryGetSetupCompletedArgs = {
  secret: Scalars['String']
};


export type QueryInitialModulesArgs = {
  type?: Maybe<ModuleType>
};


export type QueryGetControllerNodesArgs = {
  type: ControllerxNodeTypes
};


export type QueryGetControllerNodeArgs = {
  id: Scalars['String'],
  type: ControllerxNodeTypes
};


export type QueryLibraryItemArgs = {
  id: Scalars['String']
};


export type QueryManagedNodeArgs = {
  nodeId: Scalars['String']
};


export type QueryNodeRequestsArgs = {
  state: NodeRequestState
};


export type QueryTestNodeStuffArgs = {
  nodeId: Scalars['String']
};


export type QueryLsFilesArgs = {
  path2: Scalars['String'],
  path: Scalars['String'],
  IP2: Scalars['String'],
  IP: Scalars['String']
};


export type QueryTestConfigArgs = {
  id: Scalars['String']
};

export type SaveConfigurationInput = {
  controllerHost: Scalars['String'],
};

export type SubmitNodeRequestInput = {
  name: Scalars['String'],
  coreTemplateId: Scalars['String'],
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

export type CoreTemplatesQueryVariables = {};


export type CoreTemplatesQuery = (
  { __typename?: 'Query' }
  & { coreTemplates: Array<(
    { __typename?: 'CoreTemplate' }
    & Pick<CoreTemplate, 'name' | 'id' | 'os'>
  )> }
);

export type CreateCoreTemplateMutationVariables = {
  input: CreateCoreTemplateInput
};


export type CreateCoreTemplateMutation = (
  { __typename?: 'Mutation' }
  & { createCoreTemplate: (
    { __typename?: 'CoreTemplate' }
    & Pick<CoreTemplate, 'name'>
  ) }
);

export type LibraryItemsQueryVariables = {};


export type LibraryItemsQuery = (
  { __typename?: 'Query' }
  & { libraryItems: Array<(
    { __typename?: 'LibraryItem' }
    & { label: LibraryItem['name'], value: LibraryItem['id'] }
  )> }
);

export type InitialModulesQueryVariables = {};


export type InitialModulesQuery = (
  { __typename?: 'Query' }
  & { initialModules: Array<(
    { __typename?: 'Module' }
    & Pick<Module, 'type'>
    & { label: Module['name'], value: Module['git'] }
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

export type StoragesQueryVariables = {};


export type StoragesQuery = (
  { __typename?: 'Query' }
  & { getControllerNodes: Array<(
    { __typename?: 'ControllerNode' }
    & Pick<ControllerNode, 'name' | 'id'>
  )> }
);

export type NetworksQueryVariables = {};


export type NetworksQuery = (
  { __typename?: 'Query' }
  & { getControllerNodes: Array<(
    { __typename?: 'ControllerNode' }
    & Pick<ControllerNode, 'name' | 'id'>
  )> }
);

export type HostsQueryVariables = {};


export type HostsQuery = (
  { __typename?: 'Query' }
  & { getControllerNodes: Array<(
    { __typename?: 'ControllerNode' }
    & Pick<ControllerNode, 'name' | 'id'>
  )> }
);

export type CreateLifecycleMutationVariables = {
  input: CreateLifecycleInput
};


export type CreateLifecycleMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createLifecycle'>
);

export type ManagedNodeQueryVariables = {
  nodeId: Scalars['String']
};


export type ManagedNodeQuery = (
  { __typename?: 'Query' }
  & { managedNode: (
    { __typename?: 'ManagedNode' }
    & Pick<ManagedNode, 'name' | 'id'>
    & { logs: Array<(
      { __typename?: 'Log' }
      & Pick<Log, 'id' | 'createdAt'>
      & { commandResults: Array<(
        { __typename?: 'CommandResult' }
        & Pick<CommandResult, 'command' | 'result'>
      )> }
    )> }
  ) }
);

export type ManagedNodesQueryVariables = {};


export type ManagedNodesQuery = (
  { __typename?: 'Query' }
  & { managedNodes: Array<(
    { __typename?: 'ManagedNode' }
    & Pick<ManagedNode, 'name' | 'id'>
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
