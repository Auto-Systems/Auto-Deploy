// API/src/Library/getControllers.ts
import glob from 'glob';
import { resolve } from 'path';
import { ControllerClass } from 'API/Controller/types';
import { Controller } from 'API/Modules/Controllers/ControllerModel';

interface ControllerModule {
  name: string;
  path: string;
}

export const controllers: ControllerModule[] = [];

const filenames = glob.sync(
  resolve(`${__dirname}/../Controller/*/*Controller.*s`),
);
for (const filename of filenames) {
  const module = require(filename);
  for (const [, controllerClass] of Object.entries(module as ControllerClass[]))
    if (Reflect.getMetadata('controllerClass', controllerClass) === true)
      controllers.push({
        path: filename,
        name: Reflect.getMetadata('name', controllerClass),

      });
}

export async function getFiles(): Promise<ControllerModule[]> {
  const stuff: ControllerModule[] = []
  const filenames = glob.sync(
    resolve(`${__dirname}/../Controller/*/*Controller.*s`),
  );
  for (const filename of filenames) {
    const module = require(filename);
    for (const [, controllerClass] of Object.entries(module as ControllerClass[]))
      if (Reflect.getMetadata('controllerClass', controllerClass) === true)
        stuff.push({
          path: filename,
          name: Reflect.getMetadata('name', controllerClass),
  
        });
  }
  return stuff
}

export async function createInstalledControllers(): Promise<Controller[]> {
  const currentController = await Controller.find();

  let promises: Promise<Controller>[] = [];
  for (const controller of await getFiles())
    if (!currentController.find(({ path }) => controller.path === path))
      promises.push(Controller.create({ ...controller, active: false }).save());
  return Promise.all(promises);
}
