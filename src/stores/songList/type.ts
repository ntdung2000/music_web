import SongModel from "../../models/SongModal";

export const SET_SONG_LIST = 'setSongList';

export interface SetSongListInterface {
  type: typeof SET_SONG_LIST;
  payload: {
    songs: SongModel[]
  }
}

export type SongListActionTypes = SetSongListInterface;

