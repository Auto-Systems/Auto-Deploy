// UI/UI/Components/Router/AppRoutes.tsx
import { AppRoute } from 'UI/Components/Router/types';
import { Loadable } from './Loadable';

export const AppRoutes: AppRoute[] = [
  {
    label: 'Home',
    path: '/',
    to: '/',
    exact: true,
    Loadable: Loadable(import('UI/Routes/Home/index'), 'Routes/Home/index.tsx'),
  },
  {
    label: 'Login',
    path: 'Login',
    to: '/Login',
    role: 'GUEST',
    Loadable: Loadable(
      import('UI/Routes/Authentication/Login'),
      'Routes/Authentication/Login.tsx',
    ),
  },
  {
    label: 'Setup',
    path: 'Setup',
    to: '/Setup',
    hideUI: true,
    hidden: true,
    exact: true,
    Loadable: Loadable(import('UI/Routes/Setup'), 'Routes/Setup/index.tsx'),
  },

  {
    label: 'Nodes',
    path: 'Nodes',
    to: '/Nodes',
    role: 'USER',
    Loadable: Loadable(import('UI/Routes/Node/Nodes'), 'Routes/Node/Nodes.tsx'),
    children: [
      {
        label: 'Node',
        path: 'Node/:nodeId',
        to: '/Nodes/node1',
        role: 'USER',
        hidden: true,
        exact: true,
        Loadable: Loadable(import('UI/Routes/Node/index'), 'Routes/Node/index.tsx')
      },
      {
        label: 'Request Node',
        path: 'RequestNode',
        to: '/Nodes/RequestNode',
        role: 'USER',
        Loadable: Loadable(
          import('UI/Routes/Node/Request'),
          'Routes/Node/Request.tsx',
        ),
      },
    ],
  },
  {
    label: 'Admin',
    path: 'Admin',
    to: '/Admin',
    role: 'ADMIN',
    Loadable: Loadable(import('UI/Routes/Admin/Home'), 'Routes/Admin/Home.tsx'),
    children: [
      {
        label: 'Node Requests',
        path: 'NodeRequests',
        to: '/Admin/NodeRequests',
        role: 'ADMIN',
        Loadable: Loadable(
          import('UI/Routes/Admin/NodeRequests'),
          'Routes/Admin/NodeRequests.tsx',
        ),
      },
      {
        label: 'Core Templates',
        path: 'CoreTemplates',
        to: '/Admin/CoreTemplates',
        role: 'ADMIN',
        Loadable: Loadable(import('UI/Routes/Admin/CoreTemplates'), 'Routes/Admin/CoreTemplates.tsx'),
        children: [
          {
            label: 'New Core Template',
            path: 'New',
            to: '/Admin/CoreTemplates/New',
            role: 'ADMIN',
            Loadable: Loadable(import('UI/Routes/Admin/CreateCoreTemplate'), 'Routes/Admin/CreateCoreTemplate.tsx')
          }
        ]
      }
    ],
  },
];
