import { FaPlus } from "react-icons/fa";
import { FaRandom, FaVolumeMute } from "react-icons/fa";
import {
  GiFastBackwardButton,
  GiFastForwardButton,
  GiPlayButton,
} from "react-icons/gi";
import { FaRepeat, FaVolumeHigh } from "react-icons/fa6";

const PlayerBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-black/95 flex items-center justify-between px-5 text-white z-50 select-none border-t border-white/20">
      <div className="flex items-center w-1/3 min-w-[180px]">
        <img
          src="https://picsum.photos/56"
          alt="Cover"
          className="w-14 h-14 rounded object-cover mr-3 bg-gray-800"
        />
        <div className="overflow-hidden">
          <div className="text-sm font-semibold truncate hover:underline cursor-pointer">
            Tên Bài Hát Mẫu
          </div>
          <div className="text-xs text-gray-400 truncate hover:underline hover:text-white cursor-pointer">
            Ca Sĩ / Artist
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
          <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center text-lg hover:scale-105 transition font-bold">
            <GiPlayButton />
          </button>
          <button className="text-gray-400 hover:text-white text-lg transition">
            <GiFastForwardButton />
          </button>
          <button className="text-gray-400 hover:text-white text-lg transition">
            <FaRepeat />
          </button>
        </div>

        <div className="flex items-center w-full gap-2 text-[11px] text-gray-400">
          <span>1:23</span>
          <div className="flex-grow group relative py-2 cursor-pointer">
            <div className="h-1 w-full bg-gray-600 rounded-full overflow-hidden">
              <div className="h-full bg-white w-[35%]" />
            </div>
            <div className="absolute top-1/2 left-[35%] -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full hidden group-hover:block" />
          </div>
          <span>3:45</span>
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
  );
};

export default PlayerBar;
