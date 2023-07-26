import { IonSearchbar, IonList, IonItem } from "@ionic/react";
import { Dispatch, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../stores";
import { setSongInfo } from "../../stores/song/action";
import { SongActionTypes } from "../../stores/song/type";
import "./SearchPage.css";

const SearchPage = () => {
  const songList = useSelector((state: RootState) => state.songList.songList);
  const songDispatch: Dispatch<SongActionTypes> = useDispatch();
  let [results, setResults] = useState(songList);

  const handleChange = (ev: Event) => {
    let query = "";
    const target = ev.target as HTMLIonSearchbarElement;
    if (target) query = target.value!.toLowerCase();

    setResults(
      songList && songList.filter((song) => song.name.toLowerCase().indexOf(query) > -1)
    );
  };

  const selectSong = (id: string) => {
    const selectSong = songList?.find((song) => song.id === id);
    if (selectSong) {
      songDispatch(setSongInfo(selectSong));
    }
  };

  return (
    <>
      <IonSearchbar
        debounce={800}
        onIonChange={(ev) => handleChange(ev)}
      ></IonSearchbar>
      <IonList>
        {results?.map((result) => (
          <IonItem
            className="search-result-item"
            key={result.id}
            onClick={() => selectSong(result.id)}
          >
            {result.name} - {result.creator}
          </IonItem>
        ))}
      </IonList>
    </>
  );
};
export default SearchPage;
