import { ProvisionerConfiguration } from '../types';

export const ProvisionerModule = (
  config: ProvisionerConfiguration,
): ClassDecorator => (constructor): void => {
  Reflect.defineMetadata('name', config.name, constructor);
  Reflect.defineMetadata('provisionerClass', true, constructor);
};
