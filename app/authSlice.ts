import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { AppState } from "./store";

export interface AuthState {
  username: string;
  id: number;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  username: "",
  id: 0,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.id = 0;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectUsername = (state: AppState) => state.auth.username;
export const selectID = (state: AppState) => state.auth.id;

export default authSlice.reducer;
