import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./store";
import { loadState } from "./localStorage";

export interface AuthState {
  username: string;
  id: string;
  isLoggedIn: boolean;
}

const persistedState = loadState();

const initialState: AuthState = {
  username: "",
  id: "",
  isLoggedIn: false,
  ...persistedState,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.username = action.payload.username;
      state.id = action.payload.id;
    },
    signOut: (state) => {
      state.isLoggedIn = false;
      state.username = "";
      state.id = "";
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export const selectUsername = (state: AppState) => state.auth.username;
export const selectID = (state: AppState) => state.auth.id;
export const selectIsLoggedIn = (state: AppState) => state.auth.isLoggedIn;

export default authSlice.reducer;
