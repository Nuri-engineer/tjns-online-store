import React from 'react';
import { Navigate, Outlet } from 'react-router';

type Props = {
  isAllowed: boolean;
  redirectTo: string;
  children?: React.ReactNode;
};

function ProtectedRoute({ isAllowed, redirectTo, children }: Props): React.JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children ?? <Outlet />}</>;
}

export default ProtectedRoute;
