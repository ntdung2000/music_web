import SongModel from "../../models/SongModal";
import { SetSongListInterface, SET_SONG_LIST } from "./type";

export function setSongList(
  songs: SongModel[]
): SetSongListInterface {
  return {
    type: SET_SONG_LIST,
    payload: {
      songs
    }
  }
}