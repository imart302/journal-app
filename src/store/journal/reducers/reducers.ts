import { createAction, createReducer } from '@reduxjs/toolkit';
import { IJournalSte, INote, INoteFirebase } from '../interfaces';

export const addNewNote = createAction<INote>('journal/newNote');
export const setActiveNote = createAction<number>('journal/setActiveNote');
export const setNotes = createAction<INoteFirebase>('journal/setNotes');
export const setSavig = createAction<boolean>('journal/setSaving');
export const updateNote = createAction<INoteFirebase>('journal/updateNote');
export const deleteNoteById = createAction<number>('journal/deleteNoteById');

const initialState: IJournalSte = {
  active: null,
  isSaving: false,
  messageSaved: '',
  notes: [],
};

export const journalReducer = createReducer(initialState, (builder) => {
  builder.addCase(addNewNote, (state, action) => {
    console.log('NEW NOTE ADDED');
  });

  builder.addCase(setActiveNote, (state, action) => {});

  builder.addCase(setNotes, (state, action) => {});

  builder.addCase(setSavig, (state, action) => {});

  builder.addCase(updateNote, (state, action) => {});

  builder.addCase(deleteNoteById, (state, action) => {});
});
