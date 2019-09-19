// API/src/Modules/Controllers/getActiveController.ts
import { Configuration } from '../Configurations/ConfigurationModel';
import {
  ControllerModule,
  ControllerClass,
  InitControllerParams,
  ControllerMethodENUM,
} from 'API/Controller/types';
import { ForbiddenError } from 'type-graphql';
import { run } from './run';
import { pathExists } from 'fs-extra';
import { parse } from 'path';
import { Controller } from './ControllerModel';
import { loadMethod } from 'API/Controller/Decorators/MethodDecorator';

export function extractController(controllerPath: string): ControllerClass | undefined {
  const controller = require(controllerPath);
  for (const [, controllerClass] of Object.entries(
    controller as ControllerClass[],
  ))
    if (Reflect.getMetadata('controllerClass', controllerClass))
      return controllerClass;
    return undefined
}

export async function getActiveControllerDB(): Promise<Controller> {
  const configuration = await Configuration.findOne({ id: 1 });
  if (!configuration || !configuration.activeControllerId)
    throw new ForbiddenError();
  return Controller.findOneOrFail({ id: configuration.activeControllerId })
}

export async function getActiveController(
  params?: InitControllerParams,
): Promise<ControllerModule> {
  const activeController = await getActiveControllerDB()
  const { dir } = parse(activeController.path);
  if (
    (await pathExists(`${dir}/package.json`)) &&
    !(await pathExists(`${dir}/node_modules`))
  )
    await run('npm install', { cwd: dir });
  const controller = extractController(activeController.path);

  if (!controller) throw new Error()

  const ControllerClass = new controller();

  // @ts-ignore
  let controllerModule: ControllerModule = {};

  // @ts-ignore
  for (const method of Object.keys(ControllerMethodENUM)) controllerModule[method] = loadMethod(method, ControllerClass);

  if (params) await controllerModule.initController(params);

  return controllerModule;
}
