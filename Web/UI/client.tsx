// UI/UI/client.tsx
import React, { FunctionComponent, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { hydrate, render as ReactDOMRender } from 'react-dom';
import { preloadReady } from 'react-loadable';
import { PropProvider } from 'UI/Components/Providers/PropProvider';
import { ConfigProvider } from 'UI/Components/Providers/ConfigProvider';
import { CookiesProvider } from 'react-cookie';
import { ApolloProvider } from 'UI/Components/Providers/ApolloProvider';
import { ApolloCache } from 'apollo-cache';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async function() {
    const worker = await navigator.serviceWorker.register('/service-worker.ts', { scope: '/' });
    console.log('SW registered: ', worker);
  });
}

const Main: FunctionComponent = ({ children }) => {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) jssStyles.parentNode.removeChild(jssStyles);
  }, []);

  return (
    <BrowserRouter>
      <ConfigProvider {...window.APP_STATE.CONFIG}>
        <PropProvider sessionProps={[]} props={window.APP_STATE.PROPS}>
          <CookiesProvider>
            <ApolloProvider>{children}</ApolloProvider>
          </CookiesProvider>
        </PropProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

const render = async (renderFunction: import('react-dom').Renderer, cache?: ApolloCache<any>): Promise<void> => {
  const { App } = await import('UI/App');

  renderFunction(
    <Main>
      <App />
    </Main>,
    document.getElementById('app')
  );
};

preloadReady().then(async () => {
  render(hydrate);
});

const hot = module.hot;
if (hot && hot.accept) hot.accept(async () => render(ReactDOMRender));
