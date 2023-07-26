import SongModel from "../../models/SongModal";
import { SetSongInfoInterface, SET_SONG_INFO } from "./type";

export function setSongInfo(
  song: SongModel
): SetSongInfoInterface {
  return {
    type: SET_SONG_INFO,
    payload: {
      song
    }
  }
}