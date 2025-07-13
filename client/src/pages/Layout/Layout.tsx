import React from 'react';
import { Outlet } from 'react-router';
import NavigationBar from '../../widgets/NavigationBar/ui/NavigationBar';
import Footer from '../../widgets/Footer/ui/Footer';

function Layout(): React.JSX.Element {
  return (
    <>
      <NavigationBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
