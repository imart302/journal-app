import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, clearJournalNotes } from '../../store';
import { startLogout } from '../../store/auth/thunks/startLogout';


export const Navbar = ({ drawerWidth = 240 }: { drawerWidth: number }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(startLogout());
    dispatch(clearJournalNotes());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Grid container direction="row" justifyContent="space-between">
          <Typography variant='h6' noWrap component="div"> JournalApp </Typography>
          <IconButton color='error' onClick={onLogout}>
            <LogoutOutlined></LogoutOutlined>
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
