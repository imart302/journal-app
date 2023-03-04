import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { fileUpload } from "../../../helpers/fileUpload";
import { AppDispatch, RootState } from "../../typeStore";
import { IJournalSte, INote, INoteFiles, INoteFirebase } from "../interfaces";

export const startDeleteNote = createAsyncThunk<
  INoteFirebase,
  INoteFirebase,
  {
    dispatch: AppDispatch
    state: RootState
  }  
>('journal/deleteNote', async (note, thunkAPI) => {
  const user = thunkAPI.getState().auth.user;
  const docRef = doc(FirebaseDB, `${user?.uid}/journal/notes/${note.id}`);
  await deleteDoc(docRef);
  return note;
});

export const buildStartDeleteNote = (builder: ActionReducerMapBuilder<IJournalSte>) => {
  builder.addCase(startDeleteNote.pending, (state) => {

  });

  builder.addCase(startDeleteNote.fulfilled, (state, action) => {
    console.log('NOTE DELETED');
    state.active = null;
    state.notes = state.notes.filter(note => note.id !== action.payload.id);

  });

  builder.addCase(startDeleteNote.rejected, (state, action) => {
    console.log(action);
  });
}