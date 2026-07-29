import { FaPlus } from "react-icons/fa";
import { FaRandom, FaVolumeMute } from "react-icons/fa";
import {
  GiFastBackwardButton,
  GiFastForwardButton,
  GiPlayButton,
  GiPauseButton,
} from "react-icons/gi";
import { FaRepeat, FaVolumeHigh } from "react-icons/fa6";
import { useContext, useEffect } from "react";
import { PlayerContext } from "@/context/musicContext";

const PlayerBar = () => {
  const { queue, currentIndex, isPlaying, setIsPlaying, audioRef } =
    useContext(PlayerContext);

  const currentSong = queue[currentIndex];

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    audioRef.current.play();
  }, [currentSong]);

  const togglePlayPause = async () => {
    if (!audioRef.current || !currentSong) return;

    if (audioRef.current.paused) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return currentSong ? (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 flex items-center justify-between px-5 text-white z-50 select-none border-t border-white/20">
      <div className="flex items-center w-1/3 min-w-[180px]">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${currentSong.cover}`}
          alt="Cover"
          className="w-14 h-14 rounded object-cover mr-3 bg-gray-800"
        />
        <div className="overflow-hidden">
          <div className="text-sm font-semibold truncate hover:underline cursor-pointer">
            {currentSong.title}
          </div>
          <div className="text-xs text-gray-400 truncate hover:underline hover:text-white cursor-pointer">
            {currentSong.owner.artistName}
          </div>
        </div>
        <div className="text-sm px-2">
          <button className="p-2 rounded-2xl bg-white/20 text-white/60 hover:text-white">
            <FaPlus />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-1/3 max-w-[600px]">
        <div className="flex items-center gap-5 mb-1.5">
          <button className="text-gray-400 hover:text-white text-lg transition">
            <FaRandom />
          </button>
          <button className="text-gray-400 hover:text-white text-xl transition">
            <GiFastBackwardButton />
          </button>
          <button
            className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-lg hover:scale-105 transition font-bold"
            onClick={() => {
              togglePlayPause();
            }}
          >
            {isPlaying ? <GiPauseButton /> : <GiPlayButton />}
          </button>
          <button className="text-gray-400 hover:text-white text-lg transition">
            <GiFastForwardButton />
          </button>
          <button className="text-gray-400 hover:text-white text-lg transition">
            <FaRepeat />
          </button>
        </div>

        <div className="flex items-center w-full gap-2 text-[11px] text-gray-400">
          <audio
            ref={audioRef}
            src={
              currentSong
                ? `${import.meta.env.VITE_BACKEND_URL}/${currentSong.audioUrl}`
                : ""
            }
          />
          {/* <span>0:00</span>
          <div className="flex-grow group relative py-2 cursor-pointer">
            <div className="h-1 w-full bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[35%]" />
            </div>
            <div className="absolute top-1/2 left-[35%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full hidden group-hover:block" />
          </div>
          <span>3:45</span> */}
        </div>
      </div>

      <div className="flex items-center justify-end w-1/3 gap-3">
        <button className="text-xl text-gray-400 hover:text-white text-base transition">
          <FaVolumeHigh />
        </button>
        {/* <button className="text-xl text-gray-400 hover:text-white text-base transition">
          <FaVolumeMute />
        </button> */}

        {/* Thanh âm lượng */}
        <div className="w-24 group relative py-2 cursor-pointer">
          <div className="h-1 w-full bg-gray-600 rounded-full overflow-hidden">
            {/* Mức âm lượng mẫu (Ví dụ 70%) */}
            <div className="h-full bg-white group-hover:bg-[#1db954] w-[70%]" />
          </div>
          <div className="absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full hidden group-hover:block" />
        </div>
      </div>
    </div>
  ) : (
    <>
      <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 flex flex-col justify-center items-center  px-5 text-white z-50 select-none border-t border-white/20">
        <p>You want a random song?</p>
        <button className="border rounded-2xl px-3 py-1 cursor-pointer text-white/60 hover:text-white">
          Play it
        </button>
      </div>
    </>
  );
};

export default PlayerBar;
