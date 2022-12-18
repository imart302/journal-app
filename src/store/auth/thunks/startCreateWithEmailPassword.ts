import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { registerEmailPassword } from "../../../firebase/providers";
import { IAuthSte, ICheckingAuthPayload, IGoogleResponsePayload } from "../interfaces/authInterfaces";



export const startCreateWithEmailPassword = createAsyncThunk<IGoogleResponsePayload, ICheckingAuthPayload>(
  'auth/register',
  async (auth) => {
    const response = await registerEmailPassword(auth) as IGoogleResponsePayload;
    return response;
  }
)

export const buildStartCreateWithEmailPassword = (builder: ActionReducerMapBuilder<IAuthSte>) => {
  builder.addCase(startCreateWithEmailPassword.pending, (state, action) => {
    state.status = 'Cheking';
  });
  builder.addCase(startCreateWithEmailPassword.fulfilled, (state, action) => {
    state.status = 'None';
    state.error = null;
  });
  builder.addCase(startCreateWithEmailPassword.rejected, (state, action) => {
    state.status = 'None';
    state.error = action.error.message || 'Error creating account';
  });

}