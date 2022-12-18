import { createReducer, createSlice } from "@reduxjs/toolkit";
import { IJournalSte } from "./interfaces";
import { journalReducer } from "./reducers/reducers";
import { buildStartNewNote } from "./thunks/startNewNote";


const initialState: IJournalSte = {
  active: null,
  isSaving: false,
  messageSaved: '',
  notes: []
}


export const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    journalReducer,
  },
  extraReducers: (builder) => {
    buildStartNewNote(builder);
  }
});

export const {addNewNote, setActiveNote, setNotes, setSavig, updateNote, deleteNoteById } = journalSlice.actions;