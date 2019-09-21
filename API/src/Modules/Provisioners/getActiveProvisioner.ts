// API/src/Modules/Provisioner/getActiveProvisioner.ts
import { ProvisionerClass } from 'API/Provisioner/types';
import { Provisioner } from './ProvisionerModel';

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
  return Provisioner.findOneOrFail({ where: { active: true } })
}