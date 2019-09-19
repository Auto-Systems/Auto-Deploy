// Web/UI/Components/Admin/Settings/Section.tsx
import React, { PropsWithChildren } from 'react';
import { Section, SectionProps } from '../Layout/Section';

interface SettingsLayoutProps {
  section: SectionProps;
}

export function SettingsLayout({
  section,
  children
}: PropsWithChildren<SettingsLayoutProps>): React.ReactElement {
  return (
    <div style={{ minHeight: '100%', width: '100%', background: '#eee' }}>
      <Section {...section} />
      <div
        style={{
          margin: '1em 1em 0 1em',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ maxWidth: '600px' }}>{children}</div>
      </div>
    </div>
  );
}
