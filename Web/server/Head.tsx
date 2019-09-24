// UI/server/Head.tsx
import React from 'react';
import { renderToString, renderToNodeStream } from 'react-dom/server';
import { Source } from './type';
import { ServerStyleSheets } from '@material-ui/styles';

const AppCSS = `
#app {
  display: flex;
  flex-direction: column;
}
html, body, #app {
  height: 100%;
  width: 100%;
}`;

interface AppHeadProps {
  sheets: ServerStyleSheets;
  sources: Source[];
}

export function AppHead({ sources, sheets }: AppHeadProps): React.ReactElement {
  return (
    <head>
      <link rel='manifest' href='/manifest.webmanifest' />
      <meta charSet='UTF-8' />
      <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' name='viewport' />
      {sources && sources.map(({ src, type }, index) => <link rel='preload' href={src} as={type} key={index} />)}
      {sources &&
        sources
          .filter(({ type }) => type === 'style')
          .map(({ src }, index) => <link rel='stylesheet' type='text/css' href={src} key={index} />)}
      <style id='jss-server-side' dangerouslySetInnerHTML={{ __html: sheets.toString() }} />
      <style>{AppCSS}</style>
    </head>
  );
}

export function renderAppHeadStream(props: AppHeadProps): NodeJS.ReadableStream {
  return renderToNodeStream(<AppHead {...props} />);
}

export function renderAppHead(props: AppHeadProps): string {
  return renderToString(<AppHead {...props} />);
}
