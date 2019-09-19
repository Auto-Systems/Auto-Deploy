// UI/UI/Components/Router/Loadable.tsx
import React, { ComponentType, FunctionComponent } from 'react';
import Load, { LoadableComponent } from 'react-loadable';
import { LoadingProgress } from '../Layout/LoadingProgress';

export type LoadableType<Props> = ComponentType<Props> & LoadableComponent | FunctionComponent<Props> & LoadableComponent;

export function Loadable<Props>(imported: Promise<any>, module: string): LoadableType<Props> {
  return Load<Props>({
    loading: LoadingProgress,
    loader: () => imported,
    modules: [module]
  });
}
