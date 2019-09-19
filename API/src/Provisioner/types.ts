// API/src/Provisioner/types.ts
export enum ProvisionerMethodENUM {
  'initProvisioner' = 'initProvisioner',
  'addAuthentication' = 'addAuthentication',
  'loadKeys' = 'loadKeys',
  'runCommand' = 'runCommand',
  'closeConnection' = 'closeConnection',
  'initFiles' = 'initFiles',
  'createWriteStream' = 'createWriteStream',
  'createReadStream' = 'createReadStream',
  'listDirectory' = 'listDirectory'
}

export type ProvisionerMethod =
  | 'initProvisioner'
  | 'addAuthentication'
  | 'loadKeys'
  | 'runCommand'
  | 'closeConnection'
  | 'initFiles'
  | 'createWriteStream'
  | 'listDirectory'
  | 'createReadStream';

export interface ProvisionerConfiguration {
  name: string;
}

export interface Keys {
  privateKey: string;
  publicKey: string;
}

export interface AddAuthenticationInput {
  host: string;
  username: string;
  password: string;
}

export interface File {
  filename: string;
}

export interface ProvisionerModule {
  /**
   * Connect to a client that already has had initialProvision
   */
  initProvisioner: (host: string) => Promise<void>;

  addAuthentication: (input: AddAuthenticationInput) => Promise<void>;

  loadKeys: () => Promise<Keys>;

  runCommand: (cmd: string) => Promise<string>;

  closeConnection: () => Promise<void>;

  initFiles: () => Promise<void>;

  listDirectory: (dirPath: string) => Promise<File[]>

  /**
   * Create write stream to file on node;
   */
  createWriteStream: (filePath: string) => Promise<import('stream').Writable>;

  /**
   * Create readstream to file on node
   */
  createReadStream: (filePath: string) => Promise<import('stream').Readable>;
}

export type MethodNames = { [method in ProvisionerMethod]: string };

export interface ProvisionerClass {
  new (): ProvisionerModule;
}

export interface MethodDecoratorConfiguration {
  type: ProvisionerMethod;
}
