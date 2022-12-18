import { ActionReducerMapBuilder, createAsyncThunk } from "@reduxjs/toolkit";
import { logoutFirebase, signInWithEmailPassword } from "../../../firebase/providers";
import { IAuthSte, IGoogleResponsePayload, ILoginEmailPassword } from "../interfaces/authInterfaces";

export const startLogout = createAsyncThunk<void, void>(
  'auth/logout',
  async () => {
    await logoutFirebase();
    return;
  }
)

export const buildStartLogout = (builder: ActionReducerMapBuilder<IAuthSte>) => {
  builder.addCase(startLogout.pending, (state) => {
    state.status = 'Cheking';
  });
  builder.addCase(startLogout.fulfilled, (state, action) => {
    state.user = null;
    state.status = 'None';
    state.error = null;
  });
  builder.addCase(startLogout.rejected, (state, action) => {
    state.user = null;
    state.status = 'None';
    state.error = action.error.message || 'Error while logout';
  });
}