import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { signOut } from "firebase/auth";
import { add, musicalNotes, search } from "ionicons/icons";
import React, { useEffect, useMemo } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { Dispatch } from "redux";
import PlayMusicTab from "../../components/playMusicTab";
import { getAppAuth } from "../../config/firebase";
import { useGettAllDocuments } from "../../hooks/useAddDocument";
import SongModel from "../../models/SongModal";
import { RootState } from "../../stores";
import { setSongList } from "../../stores/songList/action";
import { SongListActionTypes } from "../../stores/songList/type";
import "./HomeLayout.css";

const HomeLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const song = useSelector((state: RootState) => state.song.songInfo);
  const songListDispatch: Dispatch<SongListActionTypes> = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const songList = useGettAllDocuments("musics") as SongModel[];

  useEffect(() => {
    songListDispatch(setSongList(songList))
    console.log(songList)
  },[songList])

  const logout = async () => {
    await signOut(getAppAuth);
    history.push("/login");
  };

  const tile = useMemo(() => {
    switch (location.pathname) {
      case "/list":
        return "List music";
      case "/search":
        return "Search music";
      case "/add-music":
        return "Add music";
      default:
        return "Home page";
    }
  }, [location]);

  return (
    <>
      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar color="success">
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding" color="primary">
          <IonButton color="success" expand="full">
            <NavLink to="/profile" className="text-link">
              Profile
            </NavLink>
          </IonButton>
          <IonButton color="danger" expand="full" onClick={logout}>
            Log Out
          </IonButton>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar color="success">
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>{tile}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent scrollEvents={true} className="home-layout-content">
          {children}
          <div className="home-layout-content-padding"></div>
        </IonContent>
        <IonFooter>
          {song?.id && <PlayMusicTab song={song} />}
        </IonFooter>
        <IonTabBar slot="bottom">
          <IonTabButton tab="list" href="/list">
            <IonIcon aria-hidden="true" icon={musicalNotes} />
            <IonLabel>Music</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/search">
            <IonIcon aria-hidden="true" icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="add-music" href="/add-music">
            <IonIcon aria-hidden="true" icon={add} />
            <IonLabel>Add Music</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonPage>
    </>
  );
};

export default HomeLayout;
