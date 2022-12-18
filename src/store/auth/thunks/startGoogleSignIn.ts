import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithGoogle } from "../../../firebase/providers";
import { IAuthSte, IGoogleResponsePayload, IUser } from "../interfaces/authInterfaces";


export const startGoogleSignIn = createAsyncThunk<IGoogleResponsePayload, void>(
  'auth/google',
  async () => {
    const response = await signInWithGoogle() as IGoogleResponsePayload;
    console.log('Google sign in');
    return response;
  }
)

export const builStartGoogleSignIn = (builder: ActionReducerMapBuilder<IAuthSte>) => {

  builder.addCase(startGoogleSignIn.pending, (state, action) => {
    state.status = 'Cheking';
  });
  builder.addCase(startGoogleSignIn.fulfilled, (state, action) => {
    if(action.payload.ok){
      const user : IUser = {
        displayName: action.payload.displayName || '',
        email: action.payload.displayName || '',
        errorMessage: action.payload.error,
        photoURL: action.payload.photoURL || '',
        uid: action.payload.uid || ''
      }

      state.user = user;
      state.status = 'Auth';
    }
  });
  builder.addCase(startGoogleSignIn.rejected, (state, action) => {
    state.status = 'None';
  });
}