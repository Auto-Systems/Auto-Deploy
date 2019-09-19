// API/src/Provisioner/Decorators/MethodDecorators.ts
import { MethodNames, MethodDecoratorConfiguration, ProvisionerModule } from '../types';

const methodNames: MethodNames = {
  initProvisioner: 'initProvisioner',
  addAuthentication: 'addAuthentication',
  loadKeys: 'loadKeys',
  runCommand: 'runCommand',
  closeConnection: 'closeConnection',
  initFiles: 'initFiles',
  createWriteStream: 'createWriteStream',
  createReadStream: 'createReadStream',
  listDirectory: 'listDirectory'
};
// @ts-ignore
export const loadMethod = <T extends keyof MethodNames>(key: T, controller: ProvisionerModule): ProvisionerModule[T] =>
  // @ts-ignore
  controller[methodNames[key] as keyof ProvisionerModule];

export const provisionerMethod = (config: MethodDecoratorConfiguration): MethodDecorator => {
  return (target, propertyName, PropertyDescriptor) => {
    methodNames[config.type] = propertyName as string;
  };
};
