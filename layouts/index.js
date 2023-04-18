import React from 'react';
import SideBar from '../common/components/sidebar';

const AppLayout = ({ children }) => {
  return <SideBar>{children}</SideBar>;
};

export default AppLayout;
