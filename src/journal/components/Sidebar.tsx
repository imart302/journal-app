import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NoteListItem } from './NoteListItem';

export const Sidebar = ({ drawerWidth }: { drawerWidth: number }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const notes = useSelector((state: RootState) => state.journal.notes);

  useEffect(() => {
    console.log('In sidebar');
    console.log(notes);
  }, [notes]);

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {user ? user.displayName : 'User'}
          </Typography>
        </Toolbar>
        <Divider></Divider>

        <List>
          {notes.map((note) => {
            return <NoteListItem key={note.id} note={note} />;
          })}
        </List>
      </Drawer>
    </Box>
  );
};
