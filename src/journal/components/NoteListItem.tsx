import { TurnedInNot } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, INoteFirebase, setActiveNote } from '../../store';

export const NoteListItem = ({ note }: { note: INoteFirebase }) => {
  const dispatch = useDispatch<AppDispatch>();

  const onSetActiveNote = () => {
    console.log('seeting active note');
    dispatch(setActiveNote(note));
  }

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onSetActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={note.title} />
          <ListItemText secondary={note.body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};
