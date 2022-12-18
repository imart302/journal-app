import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { journalReducer } from './journal/reducers'
// ...

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalReducer,
  }
})
