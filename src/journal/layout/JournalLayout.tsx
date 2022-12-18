import React from 'react';
import { Box } from '@mui/system';
import { Navbar, Sidebar } from '../components';
import { Toolbar } from '@mui/material';

const drawerWidth = 240;

export const JournalLayout = ({
  children,
}: {
  children: React.ReactElement[] | React.ReactElement;
}) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Navbar */}
      <Navbar drawerWidth={drawerWidth}></Navbar>

      {/* Drawer */}
      <Sidebar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
