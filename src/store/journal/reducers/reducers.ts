import { createAction, createReducer, PayloadAction } from '@reduxjs/toolkit';
import { IJournalSte, INote, INoteFirebase } from '../interfaces';


export const addNewNote = (state: IJournalSte, action: PayloadAction<void>) => {

}

export const setActiveNote = (state: IJournalSte, action: PayloadAction<INoteFirebase>) => {
  state.active = action.payload;
  console.log("🚀 ~ file: reducers.ts:11 ~ setActiveNote ~ payload", action.payload);
  state.messageSaved = '';
}

export const setNotes = (state: IJournalSte, action: PayloadAction<void>) => {

}

export const setSavig = (state: IJournalSte, action: PayloadAction<void>) => {

}

export const updateNote = (state: IJournalSte, action: PayloadAction<void>) => {

}

export const deleteNoteById = (state: IJournalSte, action: PayloadAction<void>) => {

}

export const clearJournalNotes = (state: IJournalSte) => {
  state.active = null,
  state.notes = []
}