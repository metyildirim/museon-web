import { configureStore } from "@reduxjs/toolkit";
import { saveState } from "./localStorage";
import authReducer from "./authSlice";
import playerReducer from "./playerSlice";

export function makeStore() {
  return configureStore({
    reducer: { auth: authReducer, player: playerReducer },
  });
}

const store = makeStore();

store.subscribe(() => {
  saveState({
    id: store.getState().auth.id,
    username: store.getState().auth.username,
    isLoggedIn: store.getState().auth.isLoggedIn,
  });
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
