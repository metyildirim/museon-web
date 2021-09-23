import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from "./store";

export interface PlayerState {
  likedSongs: Array<string>;
}

export interface PlayerLikeActionType {
  id: string;
}

const initialState: PlayerState = {
  likedSongs: [],
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    likeSong: (state, action: PayloadAction<PlayerLikeActionType>) => {
      state.likedSongs.push(action.payload.id);
    },
    removeLike: (state, action: PayloadAction<PlayerLikeActionType>) => {
      state.likedSongs = state.likedSongs.filter(
        (id) => id !== action.payload.id
      );
    },
  },
});

export const { likeSong, removeLike } = playerSlice.actions;

export const selectLikedSongs = (state: AppState) => state.player.likedSongs;

export default playerSlice.reducer;
