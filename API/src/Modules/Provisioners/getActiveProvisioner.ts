// API/src/Modules/Provisioner/getActiveProvisioner.ts
import { Configuration } from '../Configurations/ConfigurationModel';
import {
  ProvisionerModule,
  ProvisionerClass,
  ProvisionerMethodENUM
} from 'API/Provisioner/types';
import { ForbiddenError } from 'type-graphql';
import { run } from './run';
import { pathExists } from 'fs-extra';
import { parse } from 'path';
import { Provisioner } from './ProvisionerModel';
import { loadMethod } from 'API/Provisioner/Decorators/MethodDecorator';

export function extractProvisioner(provisionerPath: string): ProvisionerClass | undefined {
  const provisioner = require(provisionerPath);
  for (const [, provisionerClass] of Object.entries(
    provisioner as ProvisionerClass[],
  ))
    if (Reflect.getMetadata('provisionerClass', provisionerClass))
      return provisionerClass;
    return undefined
}

export async function getActiveProvisionerDB(): Promise<Provisioner> {
  const configuration = await Configuration.findOne({ id: 1 });
  if (!configuration || !configuration.activeProvisionerId)
    throw new ForbiddenError();
  return Provisioner.findOneOrFail({ id: configuration.activeProvisionerId })
}

export async function getActiveProvisioner(): Promise<ProvisionerModule> {
  const activeProvisioner = await getActiveProvisionerDB()
  const { dir } = parse(activeProvisioner.path);
  if (
    (await pathExists(`${dir}/package.json`)) &&
    !(await pathExists(`${dir}/node_modules`))
  ) await run('npm install', { cwd: dir });

  const provisioner = extractProvisioner(activeProvisioner.path);

  if (!provisioner) throw new Error()

  const ProvisionerClass = new provisioner();

  // @ts-ignore
  let provisionerModule: ProvisionerModule = {};

  // @ts-ignore
  for (const method of Object.keys(ProvisionerMethodENUM)) provisionerModule[method] = loadMethod(method, ProvisionerClass);

  // if (params) await controllerModule.initController(params);

  return provisionerModule;
}