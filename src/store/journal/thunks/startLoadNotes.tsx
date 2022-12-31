import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { getUserColletion } from "../../../firebase/providers";
import { AppDispatch, RootState } from "../../typeStore";
import { IJournalSte, INote, INoteFirebase } from "../interfaces";

export const startLoadingNotes = createAsyncThunk<
  INoteFirebase[], 
  void,
  {
    dispatch: AppDispatch
    state: RootState
  }  
>('journal/loadNotes', async ( _ , thunkAPI) => {
  const user = thunkAPI.getState().auth.user;

  const notes = await getUserColletion(user?.uid || '', 'journal/notes');
  console.log(notes);
  return notes as INoteFirebase[];
});

export const buildStartLoadingNotes = (builder: ActionReducerMapBuilder<IJournalSte>) => {
  builder.addCase(startLoadingNotes.pending, (state, action) => {
    console.log('LOADING NOTES FROM FIREBASE');
  });

  builder.addCase(startLoadingNotes.fulfilled, (state, action) => {
    console.log('Loading notes fullfilled');
    state.notes = action.payload;
  });

  builder.addCase(startLoadingNotes.rejected, (state, action) => {

  });
}