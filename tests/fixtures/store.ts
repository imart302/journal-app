import { configureStore } from "@reduxjs/toolkit";
import { authSlice, journalSlice } from "../../src/store";

export const createTestStore = () => {
  const store = configureStore({
    reducer: {
      auth: authSlice.reducer,
      journal: journalSlice.reducer,
    }
  });

  return store;
}
