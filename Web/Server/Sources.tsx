// UI/server/Sources.tsx
import React from 'react';
import { Source } from 'server/type';
import { renderToString } from 'react-dom/server';

interface ScriptTagsProps {
  sources: Source[];
}

export function ScriptTags({ sources }: ScriptTagsProps): React.ReactElement {
  return (
    <>
      {sources
        .filter(({ type }) => type === 'script')
        .reverse()
        .map(({ src }, index) => (
          <script async type='text/javascript' key={index} src={src} />
        ))}
    </>
  );
}

export function renderScripts(sources: Source[]): string {
  return renderToString(<ScriptTags sources={sources} />);
}
