// UI/UI/Components/Router/findRoute.ts
import { AppRoute } from 'UI/Components/Router/types';

/**
 * Recursively searches for a App Route
 * @param routes Routes you want to recursively search
 * @param path Path of the route you are looking for
 */
export const findRoute = (routes: AppRoute[], path: string): AppRoute | undefined => {
  for (const route of routes) {
    if (route.to === path || path.replace(/.*(\/)$/, '') === route.to) return route;
    else if (route.children) return findRoute(route.children, path);
  }
};
