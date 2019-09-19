require('module-alias');
import { config } from 'API/config';
import { resolve } from 'path';
import { createConnection } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';

export function getConnectionArgs(
  test: boolean = false,
): PostgresConnectionOptions {
  return {
    type: 'postgres',
    database: test ? 'autodeploytest' : config.db.name,
    username: config.db.username,
    password: config.db.password,
    port: parseInt(`${config.db.port}`, 10),
    host: config.db.host,
    entities: [
      resolve(`${__dirname}/../Modules/**/*Model.ts`),
      resolve(`${__dirname}/../Modules/**/*Model.js`),
    ],
    synchronize: true || config.env === 'development',
    logging: true,
  };
}

export const connectionArgs: PostgresConnectionOptions = {
  type: 'postgres',
  database: config.db.name,
  username: config.db.username,
  password: config.db.password,
  port: config.db.port,
  host: config.db.host,
  entities: [
    resolve(`${__dirname}/../Modules/**/*Model.ts`),
  ],
  synchronize: true || config.env === 'development',
  logging: true,
};

export async function ensureDbConnection() {
  try {
    await createConnection(getConnectionArgs());
  } catch (e) {
    if (!(e instanceof AlreadyHasActiveConnectionError)) {
      throw e;
    }
  }
}
