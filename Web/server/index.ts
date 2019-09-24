// UI/server/index.ts
// KristianFJones <me@kristianjones.xyz>
import Koa from 'koa';
import Router from '@koa/router';
import serve from 'koa-static';
import { readJSON } from 'fs-extra';
import cookiesMiddleware from 'universal-cookie-koa';
import { initApollo } from './initApollo';
import { checkIsSetup, getConfig } from './Settings';

const port = 81;

const loadServer = async (): Promise<typeof import('./server')> => {
  const manifest = await readJSON(`dist/server/server.json`);
  return import(`${__dirname}${manifest['server']}`);
};

const startServer = async (): Promise<void> => {
  const server = new Koa();
  const router = new Router();

  const client = initApollo();

  const setupTEST = (path: string): boolean => /Setup$/.test(path);

  server.use(cookiesMiddleware());

  router.get('*', serve('dist/public'));

  router.get('*', async (ctx, next) => {
    const isSetup = await checkIsSetup(client);
    if (isSetup && setupTEST(ctx.path)) return ctx.redirect('/');
    else if (isSetup) return next();
    else if (!isSetup && !setupTEST(ctx.path)) return ctx.redirect('/Setup');
    else if (/Setup$/.test(ctx.path)) return next();
  });

  router.get('*', async ctx => {
    let { uiServer } = await loadServer();
    if (process.env.NODE_ENV === 'development') {
      const chokidar = await import('chokidar');
      chokidar
        .watch(`${__dirname}/parcel-manifest.json`, {
          ignoreInitial: true,
          awaitWriteFinish: { stabilityThreshold: 100 }
        })
        .on('all', async () => {
          process.stdout.write('Reloading UI Server...');
          uiServer = (await loadServer()).uiServer;
          process.stdout.write('✅\n');
        });
    }
    return uiServer(ctx, {
      baseUrl: process.env['BASEURL'] as string || 'http://localhost',
      appName: 'Auto Deploy'
    });
  });

  server.use(router.routes()).use(router.allowedMethods());

  server.listen(port, () => console.log(`Server listening on port ${port}`));
};

startServer();
