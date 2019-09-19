declare module 'react-portalize' {
  import { FunctionComponent } from 'react';
  interface PortalizeProvider {
    provider: React.ProviderExoticComponent<any>;
    value: any;
  }

  interface PortalizeProps {
    /**
     * DOM Selector to render the portal into
     */
    container: string;
    server: boolean;
    providers?: PortalizeProvider[];
  }
  const Portalize: FunctionComponent<PortalizeProps>;
  export default Portalize;
}

declare module 'react-portalize/server' {
  export function renderPortalsToString(html: string): string;
}
