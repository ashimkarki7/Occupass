import type { ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';
import { mainRoutesList } from './RouteListItems.tsx';
import PublicBasedRoute from '../hoc/PublicRoute.tsx';
import type { RouteItem } from '@routes/routes.ts';

const parseRoutes = (routeList: RouteItem[]): ReactNode => (
  <Routes>
    {routeList.map((route) =>
      (
        <Route
          key={route.key}
          path={route.path}
          element={
            <PublicBasedRoute>
              <route.LazyComponent />
            </PublicBasedRoute>
          }
        />
      )
    )}
  </Routes>
);

export const mainRoutes = parseRoutes(mainRoutesList);
