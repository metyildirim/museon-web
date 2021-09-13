import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";

export function makeStore() {
  return configureStore({
    reducer: { auth: authReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
