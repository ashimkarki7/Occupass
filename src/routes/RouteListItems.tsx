import type { RouteItem } from '@/routes/routes.ts';
import { lazy } from 'react';

export const mainRoutesList: RouteItem[] = [
  {
    key: 1,
    name: 'Customers',
    path: '/',
    LazyComponent: lazy(
      () => import('@pages/HomePage/Container/HomePageContainer.tsx')
    ),
    exact: true,
  },
  {
    key: 1.1,
    name: 'Customer Details',
    path: '/customers/:id',
    LazyComponent: lazy(() => import('@pages/CustomerDetails/Container/CustomerDetailsContainer.tsx')),
    exact: true,
  },
  {
    key: 2,
    name: 'Orders',
    path: '/orders',
    LazyComponent: lazy(
      () => import('@pages/Orders/Container/OrderContainer.tsx')
    ),
    exact: true,
  },
  {
    key: 2.1,
    name: 'Order Details',
    path: '/orders/:id',
    LazyComponent: lazy(() => import('@pages/OrderDetails/Container/OrderDetailsContainer.tsx')),
    exact: true,
  },
  {
    key: 3,
    name: 'Not Found',
    path: '*',
    LazyComponent: lazy(() => import('@pages/NotFound/NotFound.tsx')),
    exact: true,
  },
];
