import React from 'react';
import { useAppSelector } from '../lib/hooks';

import { Navigate, Outlet } from 'react-router';


export default function ProtectedRoute(): React.JSX.Element {
  const user = useAppSelector((state) => state.user.user);

  if (user?.status === 'user') return <Navigate to="/" replace />;

  return  <Outlet />;
}
