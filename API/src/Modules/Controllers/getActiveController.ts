// API/src/Modules/Controllers/getActiveController.ts
import { ControllerClass } from 'API/Controller/types';

export function extractController(
  controllerPath: string,
): ControllerClass | undefined {
  const controller = require(controllerPath);
  for (const [, controllerClass] of Object.entries(
    controller as ControllerClass[],
  ))
    if (Reflect.getMetadata('controllerClass', controllerClass))
      return controllerClass;
  return undefined;
}
