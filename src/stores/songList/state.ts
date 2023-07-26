import SongModel from "../../models/SongModal";
import { SET_SONG_LIST, SongListActionTypes } from "./type";

type SongListState = {
  songList: SongModel[] | null
}

export const initialState: SongListState = {
  songList: null,
}

export function SongListReducer(
  state: SongListState = initialState,
  action: SongListActionTypes,
): SongListState {
  switch(action.type) {
    case SET_SONG_LIST:
      return {
        ...state,
        songList: action.payload.songs
      }
    default: 
      return state;
  }
}