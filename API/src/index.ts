// API/index.ts
import './setup';
import KoaRouter from '@koa/router';
import { config } from 'API/config';
import { getContext } from 'API/Context';
import { generateGQLSchema } from 'API/Library/generateGQLSchema';
import { ensureDbConnection } from 'API/Library/getDbConnection';
import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';
import { downloadModules } from 'API/Modules/Configurations/Modules/downloadAllModules';

export async function startAPI(): Promise<void> {
  try {
    const db = ensureDbConnection();
    const server = new Koa();
    const serverRouter = new KoaRouter();

    server.use(serverRouter.routes()).use(serverRouter.allowedMethods());

    const apiServer = new ApolloServer({
      schema: await generateGQLSchema(),
      playground: true,
      introspection: true,
      context: async ({ ctx }) => getContext(ctx),
    });
    apiServer.applyMiddleware({ app: server });

    const httpServer = server.listen(config.port);
    httpServer.timeout = 10 * 60 * 1000;
    console.log(`API is listening on ${config.port}`);
    await db;
    await downloadModules();
    // Uncomment if Subscriptions are needed
    // apiServer.installSubscriptionHandlers(httpServer)
  } catch (err) {
    console.error(err);
  }
}

startAPI();
