// API/index.ts
import './setup'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import { ApolloServer } from 'apollo-server-koa'
import { generateGQLSchema } from 'API/Library/generateGQLSchema'
import { ensureDbConnection } from 'API/Library/getDbConnection'
import { getContext } from 'API/Context'
import { config } from 'API/config'
import { createInstalledControllers } from './Library/getControllers'
import { createInstalledProvisioners } from './Library/getProvisioner'

export async function startAPI(): Promise<void> {
  try {
    const dbConnProm = ensureDbConnection()
    const server = new Koa()
    const serverRouter = new KoaRouter()

    server.use(serverRouter.routes()).use(serverRouter.allowedMethods())

    const apiServer = new ApolloServer({
      schema: await generateGQLSchema(),
      playground: true,
      introspection: true,
      context: async ({ ctx }) => getContext(ctx),
    })
    apiServer.applyMiddleware({ app: server })
    
    await server.listen(config.port)
    await dbConnProm
    await Promise.all([createInstalledControllers(), createInstalledProvisioners()])
    console.log(`API is listening on`)
    // Uncomment if Subscriptions are needed
    // apiServer.installSubscriptionHandlers(httpServer)
  } catch (err) {
    console.error(err)
  }
}

startAPI()
