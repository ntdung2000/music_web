import SongModel from "../../models/SongModal";
import { SET_SONG_INFO, SongActionTypes } from "./type";

type SongState = {
  songInfo: SongModel | null
}

export const initialState: SongState = {
  songInfo: null,
}

export function SongReducer(
  state: SongState = initialState,
  action: SongActionTypes,
): SongState {
  switch(action.type) {
    case SET_SONG_INFO:
      return {
        ...state,
        songInfo: action.payload.song
      }
    default: 
      return state;
  }
}