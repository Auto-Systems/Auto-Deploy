// API/src/Modules/Configuration/Modules/downloadAllModules.ts
import { Controller } from 'API/Modules/Controllers/ControllerModel';
import { Provisioner } from 'API/Modules/Provisioners/ProvisionerModel';
import { Module, ModuleType } from './ModuleModel';
import { pathExists } from 'fs-extra';
import { ControllerPath } from 'API/Library/getControllers';
import { ProvisionerPath } from 'API/Library/getProvisioner';

export async function downloadModules(): Promise<any> {
  const modules = await Module.find();
  for (const module of modules) {
    const folder = module.git.replace(/.*\/(\w.*).git/, '$1');
    switch (module.type) {
      case ModuleType.CONTROLLER:
        if (!(await pathExists(`${ControllerPath}/${folder}`))) Controller.downloadController(module.git);
        else console.log('Controller already installed');
        break;
      case ModuleType.PROVISIONER:
        if (!(await pathExists(`${ProvisionerPath}/${folder}`))) Provisioner.downloadProvisioner(module.git);
        else console.log('Provisioner already installed');
        break;
    }
  }
}
