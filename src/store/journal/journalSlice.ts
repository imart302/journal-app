import { createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IJournalSte } from './interfaces';
import { buildStartNewNote } from './thunks/startNewNote';
import {
  addNewNote as addNewNoteReducer,
  setActiveNote as setActiveNoteReducer,
  setNotes as setNotesReducer,
  setSavig as setSavigReducer,
  updateNote as updateNoteReducer,
  deleteNoteById as deleteNoteByIdReducer,
  clearJournalNotes as clearJournalNotesReducer,
} from './reducers';
import { buildStartLoadingNotes } from './thunks/startLoadNotes';
import { buildStartSavingNote } from './thunks/startSavingNote';
import { buildStartUploadingFiles } from './thunks/startUploadingFiles';
import { buildStartDeleteNote } from './thunks/startDeleteNote';

const initialState: IJournalSte = {
  active: null,
  isSaving: false,
  messageSaved: '',
  notes: [],
};

export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addNewNote: addNewNoteReducer,
    setActiveNote: setActiveNoteReducer,
    setNotes: setNotesReducer,
    setSavig: setSavigReducer,
    updateNote: updateNoteReducer,
    deleteNoteById: deleteNoteByIdReducer,
    clearJournalNotes: clearJournalNotesReducer,
  },
  extraReducers: (builder) => {
    buildStartNewNote(builder);
    buildStartLoadingNotes(builder);
    buildStartSavingNote(builder);
    buildStartUploadingFiles(builder);
    buildStartDeleteNote(builder);
  },
});

export const { addNewNote, setActiveNote, setNotes, setSavig, updateNote, deleteNoteById, clearJournalNotes } = journalSlice.actions;
