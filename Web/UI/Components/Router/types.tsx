// UI/UI/Components/Router/types.tsx
import { LoadableType } from './Loadable';
import { UserRole } from '../Providers/SessionProvider';
import { UserCheckQueryResult }  from 'UI/Components/Providers/SessionProvider/isAuthed.gen'

export interface AppRoute {
  /**
   * Route Path for Router Route Component
   */
  path: string;

  /**
   * The full path used for navigation, Links, etc...
   */
  to: string;

  /**
   * Public label for route
   */
  label: string;

  /**
   * Required Role
   */
  role?: UserRole;

  /**
   * Hide UI. Wether the AppBar and NavBar are hidden on this route
   */
  hideUI?: boolean;

  /**
   * Exact
   */
  exact?: boolean;

  /**
   * Hidden from Lists
   */
  hidden?: boolean;

  children?: AppRoute[];

  Loadable?: LoadableType<any>;
}
