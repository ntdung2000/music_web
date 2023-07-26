import SongModel from "../../models/SongModal";

export const SET_SONG_INFO = 'setSong';

export interface SetSongInfoInterface {
  type: typeof SET_SONG_INFO;
  payload: {
    song: SongModel
  }
}

export type SongActionTypes = SetSongInfoInterface;

