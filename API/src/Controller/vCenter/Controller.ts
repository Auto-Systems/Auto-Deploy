// Backend/src/modules/Controller/vCenter/index.ts
import { NodeOS } from 'API/Modules/Controllers/Nodes/NodeOS';
import { NodePower } from 'API/Modules/Controllers/Nodes/NodePower';
import { loginVCSA, vCenter } from 'ts-vcenter';
import { controllerMethod, ControllerModule } from '../Decorators';
import {
  CreateNodeInput,
  Host,
  InitControllerParams,
  Library,
  LibraryItem,
  LoginControllerParams,
  Network,
  Node,
  NodeFilter,
  NodeInfo,
  powerNodeType,
  Storage,
} from '../types';

// @ts-ignore
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

enum LibraryItemType {
  'vm-template' = 'nodeTemplate',
  'iso' = 'iso',
  'ovf' = 'templateFile',
  'ova' = 'templateFile',
  'file' = 'file',
}

enum VMOS {
  'UBUNTU_64' = 'UBUNTU',
}

enum VMPower {
  'POWERED_OFF' = 'OFF',
  'POWERED_ON' = 'ON',
  'SUSPENDED' = 'SUSPENDED',
}

/**
 * TypeScript Example Controller Module
 */
@ControllerModule({ name: 'vCenter' })
export class vCenterModule {
  public vcsa: vCenter;

  @controllerMethod({ type: 'listNodes' })
  public async getNodes(filter?: NodeFilter): Promise<Node[]> {
    const VMs = await this.vcsa.getVMs(filter);

    return VMs.map(({ name, vm, power_state }) => ({
      name,
      id: vm,
      power: NodePower[VMPower[power_state]],
    }));
  }

  @controllerMethod({ type: 'listHosts' })
  public async listHosts(): Promise<Host[]> {
    const Hosts = await this.vcsa.getHosts();

    return Hosts.map(({ name, host }) => ({ name, id: host }));
  }

  @controllerMethod({ type: 'listNetworks' })
  public async listNetworks(): Promise<Network[]> {
    const Networks = await this.vcsa.getNetworks();

    return Networks.map(({ name, network }) => ({ name, id: network }));
  }

  @controllerMethod({ type: 'listStorage' })
  public async listStorage(): Promise<Storage[]> {
    const DS = await this.vcsa.getDataStores();

    return DS.map(({ name, datastore }) => ({ name, id: datastore }));
  }

  @controllerMethod({ type: 'getNodeInfo' })
  public async getVMInfo(nodeId: string): Promise<NodeInfo> {
    const guestInfo = await this.vcsa.getGuestInfo(nodeId);

    return {
      network: { host: guestInfo.ip_address },
      OS: NodeOS[VMOS[guestInfo.name as keyof typeof VMOS]],
    };
  }

  @controllerMethod({ type: 'powerNode' })
  public async powerVM(nodeId: string, state: powerNodeType): Promise<boolean> {
    try {
      await this.vcsa.powerVM(nodeId, state);
      return true;
    } catch {
      return false;
    }
  }

  @controllerMethod({ type: 'loginController' })
  public async loginvCenter({
    host,
    ...params
  }: LoginControllerParams): Promise<string> {
    return loginVCSA({
      ...params,
      url: host,
    });
  }

  @controllerMethod({ type: 'listLibraries' })
  public async listContentLibraries(): Promise<Library[]> {
    const Libraries = await this.vcsa.getContentLibrarys();

    return Libraries.map(({ info: { name, id, description }, items }) => ({
      name,
      id,
      description,
      items: items.map(({ type, ...item }) => ({
        ...item,
        type: LibraryItemType[type as keyof typeof LibraryItemType],
      })),
    }));
  }

  @controllerMethod({ type: 'getLibraryItem' })
  public async getContentLibraryItem(itemId: string): Promise<LibraryItem> {
    const item = await this.vcsa.getContentLibraryItem(itemId);

    return {
      ...item,
      type: LibraryItemType[item.type as keyof typeof LibraryItemType],
    };
  }

  @controllerMethod({ type: 'initController' })
  public async initController({
    token,
    host,
  }: InitControllerParams): Promise<void> {
    this.vcsa = new vCenter({ url: host, token });
  }

  @controllerMethod({ type: 'createNode' })
  public async createNode(input: CreateNodeInput): Promise<Node> {
    // const [Libraries] = await Promise.all([this.vcsa.getContentLibrarys()]);

    const Folder = await this.vcsa.getFolders({
      type: 'VIRTUAL_MACHINE',
      names: 'vm',
    });
    if (!Folder) throw new Error();

    const VMTemplate = await this.vcsa.getVMTemplate(input.coreTemplate);

    const vmId = await this.vcsa.depoyVMTemplate(input.coreTemplate, {
      placement: { host: input.host, folder: Folder[0].folder },
      hardware_customization: {
        nics: [
          {
            key: VMTemplate.nics[0].key,
            value: {
              network: input.network,
            },
          },
        ],
      },
      name: input.name,
      disk_storage: { datastore: input.storage },
      vm_home_storage: {
        datastore: input.storage,
      },
    });

    const NewVM = await this.vcsa.getVM(vmId);
    return {
      name: NewVM.name,
      id: vmId,
      power: NodePower[VMPower[NewVM.power_state]],
    };
  }
}
