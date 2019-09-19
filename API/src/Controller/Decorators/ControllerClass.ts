import { ControllerConfiguration } from '../types';

export const ControllerModule = (config: ControllerConfiguration): ClassDecorator => (constructor): void => {
  Reflect.defineMetadata('name', config.name, constructor);
  Reflect.defineMetadata('controllerClass', true, constructor)
}
  
