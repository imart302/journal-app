import { TurnedInNot } from '@mui/icons-material'
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

export const Sidebar = ({drawerWidth}: {drawerWidth: number}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {user ? user.displayName : 'User'}
          </Typography>
        </Toolbar>
        <Divider></Divider>

        <List>
          {
            ['Enero','Febrero','Marzo','Abril'].map( text => (
              <ListItem key={ text } disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Grid container>
                    <ListItemText primary={ text } />
                    <ListItemText secondary= {"Proident ea laborum ex ad"} />
                  </Grid>
                </ListItemButton>
              </ListItem>
            ))
          }
        </List>
      </Drawer>
    </Box>
  )
}
