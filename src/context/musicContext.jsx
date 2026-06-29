import { createContext, useRef, useState } from "react";

const PlayerContext = createContext();

const PlayerProvider = ({ children }) => {
  // chi 1 cai audio duy nhat dung chung cho cac bai hat
  const audioRef = useRef(new Audio());

  const [player, setPlayer] = useState({
    currentSong: null,
    isPlaying: false,
  });

  const playSong = (song) => {
    audioRef.current.src = song.audioRef;
    audioRef.current.play();

    setPlayer({
      currentSong: song,
      isPlaying: true,
    });
  };

  return (
    <PlayerContext.Provider value={{ player, setPlayer, playSong }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerProvider };
