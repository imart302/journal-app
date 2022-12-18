import { createSlice } from '@reduxjs/toolkit';
import { IAuthSte, ILoginAction } from './interfaces/authInterfaces';
import {
  buildStartCreateWithEmailPassword,
  buildStartLoginWithEmailPassword,
  builStartGoogleSignIn,
} from './thunks';
import { buildStartLogout } from './thunks/startLogout';

const initialState: IAuthSte = {
  status: 'None',
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: ILoginAction) => {
      state.user = action.payload;
      state.status = 'Auth';
    },
    logout: (state) => {
      state.error = null;
      state.status = 'None';
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    buildStartLoginWithEmailPassword(builder);

    builStartGoogleSignIn(builder);

    buildStartCreateWithEmailPassword(builder);

    buildStartLogout(builder);
  },
});

export const { logout, login } = authSlice.actions;
