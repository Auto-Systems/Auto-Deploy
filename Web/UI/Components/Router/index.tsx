// UI/UI/Components/Router/index.tsx
import React, { ReactElement } from 'react';
import { AppRoute } from './types';
import { AppRoutes } from './AppRoutes';
import { Switch, Route as RouteComponent } from 'react-router-dom';

const HandleRoutes = (routes: AppRoute[], parent: string = '/'): ReactElement[] => {
  let Routes: ReactElement[] = [];
  for (const Route of routes) {
    if (Route.children) {
      Routes = [
        ...Routes,
        <RouteComponent
          key={Route.path}
          path={`${parent}${Route.path}`}
          render={() => (
            <>
              <RouteComponent
                key={Route.path}
                path={`${parent}${Route.path}/`}
                exact
                component={Route.Loadable ? Route.Loadable : () => <>404</>}
              />
              {HandleRoutes(Route.children, `${parent}${Route.path}/`)}
            </>
          )}
        />
      ];
    } else if (typeof Route.Loadable !== 'undefined')
      Routes = [
        ...Routes,
        <RouteComponent exact={Route.exact} key={Route.path} path={`${parent}${Route.path}`} component={Route.Loadable} />
      ];
  }
  return Routes;
};

function AppRouter(): ReactElement {
  return <Switch>{HandleRoutes(AppRoutes)}</Switch>;
}

export default AppRouter;
