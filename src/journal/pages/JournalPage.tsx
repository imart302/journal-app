import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, INote, RootState, startNewNote } from '../../store';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView, NothingSelectedView } from '../views';

export const JournalPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isNoteSaving = useSelector((state: RootState) => state.journal.isSaving);
  const activeNote = useSelector((state: RootState) => state.journal.active);

  const onAddNewNote = () => {

    const note : INote = {
      title: 'test',
      body: 'test',
      date: Date.now(),
    }
    dispatch(startNewNote(note));

  }

  return (
    <JournalLayout>
      
      { activeNote ? <NoteView /> : <NothingSelectedView /> }

      <IconButton
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': {backgroundColor: 'error.main', opacity: 0.9},
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
        onClick={onAddNewNote}
        disabled={isNoteSaving}
      >
        <AddOutlined sx={{fontSize: 30}} />
      </IconButton>
    </JournalLayout>
  );
};
