import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import Section from './Section';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
