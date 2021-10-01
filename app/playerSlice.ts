import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LIST_STATES, SongType } from "../utils/museon-music-player";
import type { AppState } from "./store";

export interface PlayerState {
  likedSongs: Array<SongType>;
  isPlaying: boolean;
  listState: LIST_STATES;
  listID: string;
  songID: string;
}

export interface PlayerLikeActionType {
  song: SongType;
}

const initialState: PlayerState = {
  likedSongs: [],
  isPlaying: false,
  listState: LIST_STATES.Playlist,
  listID: "",
  songID: "",
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    likeSong: (state, action: PayloadAction<PlayerLikeActionType>) => {
      state.likedSongs.push(action.payload.song);
    },
    removeLike: (state, action: PayloadAction<PlayerLikeActionType>) => {
      state.likedSongs = state.likedSongs.filter(
        (song) => song.id !== action.payload.song.id
      );
    },
    setLikes: (state, action: PayloadAction<Array<SongType>>) => {
      state.likedSongs = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setListState: (state, action: PayloadAction<LIST_STATES>) => {
      state.listState = action.payload;
    },
    setListID: (state, action: PayloadAction<string>) => {
      state.listID = action.payload;
    },
    setSongID: (state, action: PayloadAction<string>) => {
      state.songID = action.payload;
    },
  },
});

export const {
  likeSong,
  removeLike,
  setLikes,
  setIsPlaying,
  setListState,
  setListID,
  setSongID,
} = playerSlice.actions;

export const selectLikedSongs = (state: AppState) => state.player.likedSongs;
export const selectIsPlaying = (state: AppState) => state.player.isPlaying;
export const selectListState = (state: AppState) => state.player.listState;
export const selectListID = (state: AppState) => state.player.listID;
export const selectSongID = (state: AppState) => state.player.songID;

export default playerSlice.reducer;
