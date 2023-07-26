import { IonButton, IonButtons, IonCol, IonFabButton, IonIcon, IonImg, IonRange, IonRow, IonText } from "@ionic/react"
import { chevronDown, chevronUp, pause, play, playBack, playForward, repeat, shuffle } from "ionicons/icons";
import { Dispatch, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SongModel from "../../models/SongModal";
import { RootState } from "../../stores";
import { setSongInfo } from "../../stores/song/action";
import { SongActionTypes } from "../../stores/song/type";
import "./PlayMusicTab.css"
interface PlayMusicType {
  song: SongModel
}
const PlayMusicTab = ({song}: PlayMusicType) => { 

  const audioRef = useRef<HTMLAudioElement>(null);
  const [zoomTab, setZoomTab] = useState(false);
  const [isPlay, setIsPlay] = useState(false)
  const [processNumber, setProcessNumber] = useState(0)
  const [timeOfAudio, setTimeOfAudio] = useState("")
  const [isRandomSong, setIsRandomSong] = useState(false)
  const [isRepeatSong, setIsRepeatSong] = useState(false)
  const songList = useSelector((state: RootState) => state.songList.songList);
  const songDispatch: Dispatch<SongActionTypes> = useDispatch();

  useEffect(() => {
    if (!song.name) return
    setIsPlay(true)
    audioRef.current?.play()
  },[song])

  const playOrPauseSong = () => {
    if(isPlay) {
      setIsPlay(false)
      audioRef.current?.pause()
    } else {
      setIsPlay(true)
      audioRef.current?.play()
    }
  }

  const durationFormart = useMemo(() => {
    if (audioRef.current?.duration) {
      const minute = Math.floor(audioRef.current?.duration / 60)
      const minuteFormat = minute < 10? "0" + minute.toString() : minute.toString()
      const second = Math.floor(audioRef.current?.duration % 60)
      const secondFormat = second < 10? "0" + second.toString() : second.toString() 
      return `${minuteFormat}:${secondFormat}`
    }
    return "00:00"
  }, [audioRef.current?.duration])

  const updateViewAudio = () => {
    setProcessNumber((audioRef.current?.currentTime! / audioRef.current?.duration!) * 100)
    if(audioRef.current?.currentTime) {
      const minute = Math.floor(audioRef.current?.currentTime / 60)
      const minuteFormat = minute < 10? "0" + minute.toString() : minute.toString()
      const second =  Math.floor(audioRef.current?.currentTime % 60)
      const secondFormat = second < 10? "0" + second.toString() : second.toString()
      setTimeOfAudio(`${minuteFormat}:${secondFormat}`)
    } else {
      setTimeOfAudio("00:00")
    }
  }

  const updateCurrentTimeAudio = (e: any) => {
    const newCurrentTime = e.detail.value / 100 * audioRef.current?.duration!
    audioRef.current!.currentTime = newCurrentTime
  }

  const nextSong = () => {
    const songSelect = songList?.find(songItem => songItem.name === song.name)

    if (songList && songSelect) {
      const index = songList.indexOf(songSelect)!
      if (index < songList.length - 1 ) {
        songDispatch(setSongInfo(songList[songList.indexOf(songSelect) + 1]))
      } else {
        songDispatch(setSongInfo(songList[0]))
      } 
    }
  }

  const prevSong = () => {
    const songSelect = songList?.find(songItem => songItem.name === song.name)

    if (songList && songSelect) {
      const index = songList.indexOf(songSelect)
      if (index > 0) {
        songDispatch(setSongInfo(songList[songList.indexOf(songSelect) - 1]));
      } else {
        songDispatch(setSongInfo(songList[songList.length - 1]));
      } 
    }
  }

  const randomSong = () => {
    const songSelect = songList?.find(songItem => songItem.name === song.name)

    if (songList && songSelect) {
      const index = songList.indexOf(songSelect)
      const randomIndex = Math.floor(Math.random()*songList.length);
      if (index === randomIndex) {
        if (index === 0) return songDispatch(setSongInfo(songList[randomIndex + 2]))
        if (index === songList.length) return songDispatch(setSongInfo(songList[randomIndex - 2]))
      } else {
        songDispatch(setSongInfo(songList[randomIndex]))
      } 
    } 
  }

  const repeatSong = () => {
    audioRef.current?.play()
  }

  return (
    <IonCol className="play-music-tab" style={{display: (song.name? 'block' : 'none')}}>
      <IonFabButton color="success" className="toogle-zoom-tab" onClick={() => setZoomTab(!zoomTab)}>
        <IonIcon color="light" icon={zoomTab? chevronDown : chevronUp} />
      </IonFabButton>
      <audio 
        ref={audioRef} 
        src={song.song}  
        onTimeUpdate={updateViewAudio} 
        onEnded={isRepeatSong? repeatSong : (isRandomSong? randomSong : nextSong)}
      />
      {zoomTab?
        <div className="song-tab-zoom-out">
        <IonImg src={song.thumbnail} 
          className={`song-tab-image ${isPlay && 'rotating'}`}
        />
        <IonRow className="ion-justify-content-between">
          <IonText color="success">{song.name}</IonText>
          <IonText color="success">{timeOfAudio? timeOfAudio: '00:00'}/{durationFormart}</IonText>
        </IonRow> 
        <IonRange 
          className="audio-process" 
          color="success"
          value={processNumber} 
          onIonKnobMoveEnd={(e) => updateCurrentTimeAudio(e)
        }></IonRange>
        <IonRow className="ion-justify-content-between">
          <IonButtons>
            <IonButton color={isRandomSong? 'success' : 'dark'}  onClick={() => setIsRandomSong(!isRandomSong)}>
              <IonIcon icon={shuffle} />
            </IonButton>
          </IonButtons>
          <IonButtons>
            <IonButton color="success"  onClick={isRandomSong? randomSong : prevSong}>
              <IonIcon icon={playBack} />
            </IonButton>
            <IonButton onClick={playOrPauseSong} color="success">
            <IonIcon icon={isPlay? pause : play}/>
            </IonButton >
            <IonButton color="success" onClick={isRandomSong? randomSong : nextSong}>
              <IonIcon icon={playForward} />
            </IonButton>
          </IonButtons>
          <IonButtons>
            <IonButton color={isRepeatSong? 'success' : 'dark'}  onClick={() => setIsRepeatSong(!isRepeatSong)}>
              <IonIcon icon={repeat} />
            </IonButton>
          </IonButtons>
        </IonRow>
        </div>
      :
      <IonRow className="ion-justify-content-between ion-align-items-center">
        <IonText color="success">{song.name}</IonText>
        <IonButtons>
          <IonButton color="success"  onClick={isRandomSong? randomSong : prevSong}>
            <IonIcon icon={playBack} />
          </IonButton>
          <IonButton onClick={playOrPauseSong} color="success">
            <IonIcon icon={isPlay? pause : play}/>
          </IonButton >
          <IonButton color="success" onClick={isRandomSong? randomSong : nextSong}>
            <IonIcon icon={playForward} />
          </IonButton>
        </IonButtons>
      </IonRow>
      }
    </IonCol>
  )
}

export default PlayMusicTab