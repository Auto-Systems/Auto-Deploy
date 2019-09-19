// Backend/src/modules/Controller/Decorators/MethodDecorator.ts
import { MethodDecoratorConfiguration, ControllerModule, MethodNames } from '../types';

const methodNames: MethodNames = {
  listNodes: 'listNodes',
  listNetworks: 'listNetworks',
  listStorage: 'listStorage',
  initController: 'initController',
  powerNode: 'powerNodes',
  listHosts: 'listHosts',
  createNode: 'createNode',
  loginController: 'loginController',
  listLibraries: 'listLibraries',
  listTemplates: 'listTemplates',
  getNodeInfo: 'getNodeInfo',
  getLibraryItem: 'getLibraryItem'
};

// @ts-ignore
export const loadMethod = <T extends keyof MethodNames>(key: T, controller: ControllerModule): ControllerModule[T] =>
  // @ts-ignore
  controller[methodNames[key] as keyof ControllerModule];

export const controllerMethod = (config: MethodDecoratorConfiguration): MethodDecorator => {
  return (target, propertyName, PropertyDescriptor) => {
    methodNames[config.type] = propertyName as string;
  };
};
