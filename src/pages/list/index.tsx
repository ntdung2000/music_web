import { IonCol, IonGrid, IonImg, IonRow, IonText } from "@ionic/react"
import { Dispatch, useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import SongModel from "../../models/SongModal";
import { RootState } from "../../stores";
import { setSongInfo } from "../../stores/song/action";
import { SongActionTypes } from "../../stores/song/type";
import "./ListPage.css"


const ListPage = () => {
  const songList = useSelector((state: RootState) => state.songList.songList);
  const songDispatch: Dispatch<SongActionTypes> = useDispatch();

  const changeCurrentSong = (song: SongModel) => {
    songDispatch(setSongInfo(song))
  }

  return (
    <IonGrid>
      <IonRow className="ion-wrap song-list">
        {songList?.map(songItem => (
          <IonCol 
            size-xl="4" 
            size-sm="12" 
            size-md="6" 
            size-lg="3" 
            size-xs="12" 
            className="song-item" onClick={() => changeCurrentSong(songItem)} key={songItem.name}
          >
            <IonImg src={songItem.thumbnail} className="song-image" />
            <IonText className="song-name">{songItem.name}</IonText>
            <IonText className="song-name">{songItem.creator}</IonText>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  )
}

export default ListPage