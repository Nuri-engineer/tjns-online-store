import React from 'react';
import { Route, Routes } from 'react-router';
import HomePage from '../../pages/HomePage';
import Navigation from '../../components/Navigation';

function RouterProvider() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default RouterProvider;
