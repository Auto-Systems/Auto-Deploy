// UI/server/server.tsx
import { getDataFromTree } from '@apollo/react-ssr';
import { renderPortalsToString } from 'react-portalize/server';
import { ServerStyleSheets } from '@material-ui/styles';
import { readJSON } from 'fs-extra';
import 'isomorphic-unfetch';
import { Context } from 'koa';
import { renderAppHeadStream } from 'Server/Head';
import { renderScripts } from 'Server/Sources';
import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { renderToString } from 'react-dom/server';
import { Capture, preloadAll } from 'react-loadable';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { App } from 'UI/App';
import { ApolloProvider } from 'UI/Components/Providers/ApolloProvider';
import { Config, ConfigProvider } from 'UI/Components/Providers/ConfigProvider';
import { PathPropsObject, PropProvider, Props } from 'UI/Components/Providers/PropProvider';
import { initApollo } from 'UI/Utils/initApollo';
import { AppState, Source } from './type';

export const uiServer = async (ctx: Context, config: Config): Promise<void> => {
  ctx.respond = false;
  ctx.status = 200;
  ctx.res.write('<!doctype html>\n<html>');

  const manifestFile = `dist/public/parcel-manifest.json`;
  const cssFile = `dist/CSS.json`;
  const [parcelManifest, cssManifest] = await Promise.all([
    readJSON(manifestFile) as Promise<{ [key: string]: string }>,
    readJSON(cssFile) as Promise<{ [any: string]: string }>
  ]);

  let sessionProps: PathPropsObject[] = [];
  let localProps: any;

  const sources: Source[] = [
    { type: 'script', src: parcelManifest['client.tsx'] },
    { type: 'style', src: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap' },
    { type: 'style', src: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
  ];
  const modules: string[] = [];

  await preloadAll();

  const client = initApollo({ baseUrl: config.baseUrl, token: ctx.cookies.get('token') });
  const sheets = new ServerStyleSheets();
  const context: StaticRouterContext = {};

  const coreApp = (
    <ConfigProvider {...config}>
      <CookiesProvider cookies={ctx.request.universalCookies}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </CookiesProvider>
    </ConfigProvider>
  );

  try {
    const preRenderedApp = (
      <PropProvider ctx={ctx} sessionProps={sessionProps} props={{}}>
        {coreApp}
      </PropProvider>
    );
    // Pre-render Once
    renderToString(
      <StaticRouter location={ctx.url} context={context}>
        {preRenderedApp}
      </StaticRouter>
    );
    // Re-render extracting Apollo Data and Modules
    await getDataFromTree(
      <StaticRouter location={ctx.url} context={context}>
        {preRenderedApp}
      </StaticRouter>
    );

    localProps = (await Props) || {};
    sessionProps = [{ path: ctx.path, props: (await Props) || {} }];
  } catch (e) {
    localProps = (await Props) || {};
    sessionProps = [{ path: ctx.path, props: (await Props) || {} }];
  }

  const MainApp = (
    <StaticRouter location={ctx.url} context={context}>
      <PropProvider ctx={ctx} sessionProps={sessionProps} props={localProps}>
        {coreApp}
      </PropProvider>
    </StaticRouter>
  );

  await getDataFromTree(MainApp);
  renderToString(<Capture report={moduleName => modules.push(moduleName)}>{sheets.collect(MainApp)}</Capture>);

  modules.map(moduleName =>
    Object.entries(parcelManifest)
      .filter(([a, b]) => a.replace('../node_modules/', '') === moduleName || cssManifest[moduleName] === b)
      .map(([, file]) => sources.push({ src: file, type: file.includes('.js') ? 'script' : 'style' }))
  );

  const TopStream = renderAppHeadStream({ sources, sheets });

  TopStream.pipe(
    ctx.res,
    { end: false }
  );

  const appState: AppState = {
    PROPS: {},
    APOLLO_STATE: client.cache.extract(),
    CONFIG: config
  };

  const htmlEnd = `</div><script type="text/javascript">window.APP_STATE = ${JSON.stringify(appState)}</script>${renderScripts(
    sources
  )}`;
  TopStream.on('end', () => {
    ctx.res.write('<div id="app">');
    ctx.res.write(`${renderPortalsToString(renderToString(sheets.collect(MainApp)))}`);
    ctx.res.write(htmlEnd);

    ctx.res.end(`</body></html>`);
  });
};
