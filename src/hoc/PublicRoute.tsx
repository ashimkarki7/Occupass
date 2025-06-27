import { Fragment, type JSX } from 'react';

interface RoleBasedRouteProps {
  children: JSX.Element;
}

const PublicBasedRoute = ({ children }: RoleBasedRouteProps) => {
  return <Fragment key={'route-component'}>{children}</Fragment>;
};

export default PublicBasedRoute;
