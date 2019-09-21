// API/src/Library/getProvisioner.ts
import glob from 'glob';
import { resolve } from 'path';
import { ProvisionerClass } from 'API/Provisioner/types';
import { Provisioner } from 'API/Modules/Provisioners/ProvisionerModel';

interface Module {
  name: string;
  path: string;
}

export const provisioners: Module[] = [];

const filenames = glob.sync(
  resolve(`${__dirname}/../Provisioner/*/*Provisioner.*s`),
);
for (const filename of filenames) {
  const module = require(filename);
  for (const [, provisionerClass] of Object.entries(
    module as ProvisionerClass[],
  ))
    if (Reflect.getMetadata('provisionerClass', provisionerClass) === true)
      provisioners.push({
        path: filename,
        name: Reflect.getMetadata('name', provisionerClass),
      });
}

async function getFiles(): Promise<Module[]> {
  const shit: Module[] = [];

  const filenames = glob.sync(
    resolve(`${__dirname}/../Provisioner/*/*Provisioner.*s`),
  );
  for (const filename of filenames) {
    const module = require(filename);
    for (const [, provisionerClass] of Object.entries(
      module as ProvisionerClass[],
    ))
      if (Reflect.getMetadata('provisionerClass', provisionerClass) === true)
        shit.push({
          path: filename,
          name: Reflect.getMetadata('name', provisionerClass),
        });
  }
  return shit;
}

export async function createInstalledProvisioners(): Promise<Provisioner[]> {
  const currentProvisioners = await Provisioner.find();

  let promises: Promise<Provisioner>[] = [];
  for (const provisioner of await getFiles())
    if (!currentProvisioners.find(({ path }) => provisioner.path === path))
      promises.push(
        Provisioner.create({ ...provisioner, active: false }).save(),
      );
  return Promise.all(promises);
}
