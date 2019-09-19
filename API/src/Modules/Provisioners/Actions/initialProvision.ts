// API/src/Modules/Lifecycle/Actions/initialProvision.ts
// This file is meant to preform the initial provisioning of nodes
import { ControllerContext, ProvisionerContext } from 'API/Context';
import { CoreTemplate } from 'API/Modules/Controllers/CoreTemplates/CoreTemplateModel';
import { ApolloError } from 'apollo-server-koa';
import pRetry from 'p-retry';

export enum ProvisionTypes {
  TEST = 'test',
  PROD = 'production',
}

interface ProvisionNodeInput {
  controller: ControllerContext;
  provisioner: ProvisionerContext;
  type: ProvisionTypes;
  node: string;
  coreTemplateId: number
}

export async function initialProvisionNode({
  controller: { controller, record },
  provisioner: { provisioner },
  node,
  coreTemplateId
}: ProvisionNodeInput): Promise<any> {
  try {
    await controller.powerNode(node, 'start');
  } catch {}

  const getHostInfo = async () => controller.getNodeInfo(node);

  const result = await pRetry(getHostInfo, {
    retries: 1000,
    minTimeout: 50,
    maxTimeout: 100,
  });

  const manTemplate = await CoreTemplate.findOne({
    id: coreTemplateId,
  });
  if (!manTemplate) throw new ApolloError('INVALID Template');

  await provisioner.addAuthentication({
    host: result.network.host,
    username: manTemplate.nodeAuth.username,
    password: manTemplate.nodeAuth.password,
  });
}
