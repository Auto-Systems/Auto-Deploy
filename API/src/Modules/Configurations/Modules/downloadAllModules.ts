// API/src/Modules/Configuration/Modules/downloadAllModules.ts
import { ControllerPath } from 'API/Library/getControllers';
import { ProvisionerPath } from 'API/Library/getProvisioner';
import { pathExists } from 'fs-extra';
import { Module, ModuleType } from './ModuleModel';

export async function downloadModules(): Promise<any> {
  const modules = await Module.find();
  for (const module of modules) {
    const folder = module.git.replace(/.*\/(\w.*).git/, '$1');
    
    switch (module.type) {
      case ModuleType.CONTROLLER:
        if (!(await pathExists(`${ControllerPath}/${folder}`))) Module.downloadModule({ ...module })
        else console.log('Controller already installed');
        break;
      case ModuleType.PROVISIONER:
        if (!(await pathExists(`${ProvisionerPath}/${folder}`))) Module.downloadModule({ ...module })
        else console.log('Provisioner already installed');
        break;
    }
  }
}
