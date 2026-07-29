import { createContext, useEffect, useRef, useState } from "react";
import { buildQueue } from "@/utils/playerQueue";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  // const [currentSong, setCurrentSong] = useState(null);

  const [queue, setQueue] = useState([]);

  const [playlist, setPlaylist] = useState([]);

  const [playlistInfo, setPlaylistInfo] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(-1);

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(100);

  const [repeatMode, setRepeatMode] = useState("off");

  const [shuffleMode, setShuffleMode] = useState(false);

  const [currentTime, setCurrentTime] = useState(0);

  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  // useEffect(() => {
  //   console.log("queue: ", queue);
  //   console.log(playlist);
  //   console.log(playlistInfo);
  //   console.log("currentIndex: ", currentIndex);
  //   console.log(isPlaying);
  // }, [currentIndex]);

  const playSongContext = (song, songs, playlist = null) => {
    //nhac dang phat
    // setCurrentSong(song);

    //lam cai hang doi
    const result = buildQueue(song, songs, playlist);

    setQueue(result.queue);
    setCurrentIndex(result.currentIndex);

    //nhung bai nhac tiep theo
    setPlaylist(songs);

    //neu la cai list thi se co thong tin cua cai list do
    setPlaylistInfo(playlist);

    //dang phat'
    setIsPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        queue,
        setQueue,

        playlist,
        setPlaylist,

        playlistInfo,
        setPlaylistInfo,

        currentIndex,
        setCurrentIndex,

        isPlaying,
        setIsPlaying,

        volume,
        setVolume,

        repeatMode,
        setRepeatMode,

        shuffleMode,
        setShuffleMode,

        currentTime,
        setCurrentTime,

        duration,
        setDuration,

        audioRef,

        playSongContext,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
