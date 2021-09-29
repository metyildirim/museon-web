import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SongType } from "../utils/museon-music-player";
import type { AppState } from "./store";

export interface PlayerState {
  likedSongs: Array<SongType>;
  isPlaying?: boolean;
  isPlaylist?: boolean;
  isLikes?: boolean;
  listID?: string;
  songID?: string;
}

export interface PlayerLikeActionType {
  song: SongType;
}

const initialState: PlayerState = {
  likedSongs: [],
  isPlaying: false,
  isPlaylist: false,
  isLikes: false,
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
    setLikes: (state, action: PayloadAction<PlayerState>) => {
      state.likedSongs = action.payload.likedSongs;
    },
    setPlayerState: (state, action: PayloadAction<PlayerState>) => {},
  },
});

export const { likeSong, removeLike, setLikes, setPlayerState } =
  playerSlice.actions;

export const selectLikedSongs = (state: AppState) => state.player.likedSongs;

export default playerSlice.reducer;
