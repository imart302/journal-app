import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { AppDispatch, RootState } from "../../typeStore";
import { IJournalSte, INote, INoteFirebase } from "../interfaces";

export const startSavingNote = createAsyncThunk<
  INoteFirebase, 
  INoteFirebase,
  {
    dispatch: AppDispatch
    state: RootState
  }  
>('journal/savingNote', async (note, thunkAPI) => {
  const user = thunkAPI.getState().auth.user;

  const docRef = doc( FirebaseDB, `${user?.uid}/journal/notes/${note.id}` );

  await updateDoc(docRef, {
    title: note.title,
    body: note.body,
    imageURLs: note.imageURLs ?? [] 
  });
  
  return note;
});

export const buildStartSavingNote = (builder: ActionReducerMapBuilder<IJournalSte>) => {
  builder.addCase(startSavingNote.pending, (state, action) => {
    //console.log('Updating note is pending')
    state.isSaving = true;
    state.messageSaved = '';
  });

  builder.addCase(startSavingNote.fulfilled, (state, action) => {
    //console.log('Update note fullfilled')
    state.isSaving = false;
    state.active = action.payload;
    state.notes = state.notes.map(note => {
      if (note.id === action.payload.id){
        return action.payload;
      } else {
        return note;
      }
    });

    state.messageSaved = `${action.payload.title} updated`;

  });

  builder.addCase(startSavingNote.rejected, (state, action) => {
    //console.log('Upadate note rejected')
    state.isSaving = false;
    console.log(action);
  });
}