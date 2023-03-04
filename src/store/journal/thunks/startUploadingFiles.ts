import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../firebase/config";
import { fileUpload } from "../../../helpers/fileUpload";
import { AppDispatch, RootState } from "../../typeStore";
import { IJournalSte, INote, INoteFiles, INoteFirebase } from "../interfaces";

export const startUploadingFiles = createAsyncThunk<
  string[],
  INoteFiles,
  {
    dispatch: AppDispatch
    state: RootState
  }  
>('journal/uploadFile', async (noteFiles, thunkAPI) => {

  const fileUploadProms = [];

  for ( const file of noteFiles.files) {
    fileUploadProms.push(fileUpload(file));
  }

  const resol = await Promise.all(fileUploadProms);


  //console.log(resol);
  const urls = resol.map(val => val.secure_url as string);
  console.log(urls);
  return urls;

});

export const buildStartUploadingFiles = (builder: ActionReducerMapBuilder<IJournalSte>) => {
  builder.addCase(startUploadingFiles.pending, (state) => {
    console.log('buildStartUploadingFiles pending')
    state.isSaving = true;
  });

  builder.addCase(startUploadingFiles.fulfilled, (state, action) => {
    console.log('buildStartUploadingFiles fullfilled')
    state.isSaving = false;
    if(state.active) {
      console.log('here');
      state.active.imageURLs = [ ...state.active.imageURLs ?? [], ...action.payload];
    }
  });

  builder.addCase(startUploadingFiles.rejected, (state, action) => {
    console.log('buildStartUploadingFiles rejected')
    console.log(action);
  });
}