import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { AppDispatch, RootState } from "../../typeStore";
import { IJournalSte, INote, INoteFirebase } from "../interfaces";

export const startNewNote = createAsyncThunk<
  INoteFirebase, 
  INote,
  {
    dispatch: AppDispatch
    state: RootState
  }  
>('journal/newNote', async (note, thunkAPI) => {
  const user = thunkAPI.getState().auth.user;

  const newDoc = doc( collection(FirebaseDB, `${user?.uid}/journal/notes`) );
  await setDoc(newDoc, note);
  
  return {
    ...note,
    id: newDoc.id,
  } as INoteFirebase;
});

export const buildStartNewNote = (builder: ActionReducerMapBuilder<IJournalSte>) => {
  builder.addCase(startNewNote.pending, (state) => {
    console.log('startNewNote pending')
    state.isSaving = true;
  });

  builder.addCase(startNewNote.fulfilled, (state, action) => {
    console.log('startNewNote fullfilled')
    state.isSaving = false;
    state.notes.push(action.payload);
    state.active = action.payload;
  });

  builder.addCase(startNewNote.rejected, (state, action) => {
    console.log('startNewNote rejected')
    console.log(action);
  });
}