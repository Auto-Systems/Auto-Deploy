// UI/ui/Components/Providers/PropProvider.tsx
import React, { createContext, ReactNode, useState, FunctionComponent } from 'react';
import { Context } from 'koa';
import useLocation from 'use-react-router';

export let Props: Promise<any>;

export interface PathPropsObject {
  path: string;
  props: any;
}

export const resetProps = (): void => {
  // @ts-ignore
  Props = undefined;
};

export type getProp = (ctx?: Context) => Promise<any>;

interface PropContextType {
  props: any;
  sessionProps: PathPropsObject[];
  useProps: (prop: getProp) => void;
  ctx?: Context;
}

export const PropContext = createContext<PropContextType>({
  useProps: props => {
    Props = props();
  },
  // @ts-ignore
  props: Props,
  sessionProps: [],
  ctx: undefined
});

interface PropProviderProps {
  children: ReactNode;
  ctx?: Context;
  props: any;
  sessionProps: PathPropsObject[];
}

export let setNewProps: () => Promise<boolean>;

export let setProps: (props: any) => void;

const timeout = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

export const PropProvider: FunctionComponent<PropProviderProps> = prop => {
  const { ctx, children, sessionProps } = prop;
  const [pageProps, setPageProps] = useState(prop.props);
  const { location } = useLocation();

  const useProps = (newProp: getProp): void => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === (ctx ? ctx.path : location.pathname));

    if (oldProps) Props = oldProps.props;
    else Props = newProp(ctx);
  };

  setProps = (props: any) => setPageProps(props);

  setNewProps = async () => {
    const oldProps = sessionProps.find(({ path: pth }) => pth === location.pathname);

    if (oldProps) {
      setPageProps(oldProps.props || {});
      // @ts-ignore
      Props = undefined;
      return true;
    } else {
      await timeout(50);
      if (typeof (await Props) === 'undefined') return false;
      const localProps = await Props;
      sessionProps.push({ path: location.pathname, props: localProps || {} });
      setPageProps(localProps || {});
    }
    // @ts-ignore
    Props = undefined;
    return false;
  };

  return (
    <PropContext.Provider
      value={{
        useProps,
        props: pageProps,
        sessionProps,
        ctx
      }}
    >
      {children}
    </PropContext.Provider>
  );
};
