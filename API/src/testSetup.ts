// API/src/testSetup.ts
import './setup';
import { getConnectionArgs } from 'API/Library/getDbConnection';
import { createConnection } from 'typeorm';
import { createInstalledControllers } from './Library/getControllers';


export default async function() {
  const connection = await createConnection(getConnectionArgs(true));
  await connection.dropDatabase();
  await connection.synchronize();

  const [controllers] = await Promise.all([createInstalledControllers()]);

  controllers.find(({ name }) => name === 'TSExample');
  await connection.close();
}
