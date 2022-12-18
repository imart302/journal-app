import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailPassword } from "../../../firebase/providers";
import { IAuthSte, IGoogleResponsePayload, ILoginEmailPassword } from "../interfaces/authInterfaces";

export const startLoginWithEmailPassword = createAsyncThunk<IGoogleResponsePayload, ILoginEmailPassword>(
  'auth/login',
  async (auth) => {
    const response = await signInWithEmailPassword(auth) as IGoogleResponsePayload;
    return response;
  }
)

export const buildStartLoginWithEmailPassword = (builder: ActionReducerMapBuilder<IAuthSte>) => {
  builder.addCase(startLoginWithEmailPassword.pending, (state) => {
    state.status = 'Cheking';
  });
  builder.addCase(startLoginWithEmailPassword.fulfilled, (state, action) => {
    state.user = {
      displayName: action.payload.displayName || '',
      email: action.payload.email || '',
      errorMessage: '',
      photoURL: action.payload.photoURL || '',
      uid: action.payload.uid || '',
    }
    state.status = 'Auth';
    state.error = null;
  });
  builder.addCase(startLoginWithEmailPassword.rejected, (state, action) => {
    state.user = null;
    state.status = 'None';
    state.error = action.error.message || 'Error authenticating';
  });
}