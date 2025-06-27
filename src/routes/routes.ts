import type { ReactElement, LazyExoticComponent, FC } from 'react';

export type RouteItem = {
  name: string;
  path: string;
  element?: ReactElement;
  key?: string | number;
  LazyComponent: LazyExoticComponent<FC>;
  exact?: boolean;
};
