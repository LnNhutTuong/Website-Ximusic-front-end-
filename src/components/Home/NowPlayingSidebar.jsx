const NowPlayingSidebar = (props) => {
  return (
    <div className="flex flex-col gap-4 w-80 h-[calc(100%-30px)] bg-white/5 overflow-y-auto scrollbar-none rounded-xl">
      <div className="w-full backdrop-blur-md p-4 flex flex-col rounded-xl  gap-4 border border-white/20 ">
        {/* Header & Album Art */}
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-white/60">Now playing</div>
          <div className="aspect-square w-full bg-neutral-800 rounded-lg overflow-hidden shadow-lg">
            <img
              src="https://picsum.photos/300"
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-white text-lg truncate">
                Tên Bài Hát Hay Nhất
              </h3>
              <p className="text-sm text-neutral-400 truncate">Tên Ca Sĩ</p>
            </div>
          </div>
        </div>
      </div>

      {/* about the artist */}
      <div className="w-full bg-neutral-800/50 rounded-xl overflow-hidden hover:bg-neutral-800 transition-colors flex-shrink-0">
        <div className="relative aspect-square w-full shadow-lg group">
          <img
            src="https://picsum.photos/300"
            alt="Cover"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/40 to-transparent" />

          <span className="absolute top-3 left-3 font-bold text-white bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-[15px] uppercase tracking-wider">
            About the artist
          </span>

          <div className="px-4 py-2">
            <h3 className="font-bold text-xl hover:underline cursor-pointer drop-shadow-md">
              Tên Nghệ Sĩ
            </h3>
            <p className="text-xs text-neutral-300 mt-0.5 drop-shadow">
              1.2M Monthly Listeners / Followers
            </p>
            <p className="text-xs text-neutral-200 line-clamp-2 mt-1.5 leading-relaxed drop-shadow">
              Mô tả ngắn gọn về tiểu sử, phong cách sáng tác nghệ thuật hoặc
              chặng đường âm nhạc của nghệ sĩ...
            </p>
          </div>
        </div>
      </div>

      {/* credits */}
      <div className="px-3">
        <h2 className="text-[18px] font-bold uppercase tracking-wider">
          Credits
        </h2>
        <div className="space-y-2 text-sm bg-neutral-800/30 p-4 rounded-xl">
          <div className="flex justify-between">
            <span className="text-gray-400">Main Artist</span>
            <span className="font-medium">Tên Nghệ Sĩ Chính</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Producer / Writer</span>
            <span className="font-medium text-gray-200">
              Producer A, Writer B
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Release Date</span>
            <span className="font-medium text-gray-200">28 June, 2026</span>
          </div>
        </div>
      </div>

      {/* queue */}
      <div className="px-3">
        <div className="flex justify-between items-center ">
          <h2 className="text-[18px] font-bold  tracking-wider">
            Next in queue
          </h2>
          <button className="text-xs font-semibold bg-white/10 p-1 rounded-lg cursor-pointer text-white/60 hover:text-white hover:underline">
            Open Queue
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800 group cursor-pointer transition-colors">
            <div className="w-10 h-10 bg-neutral-700 rounded-md flex-shrink-0 flex items-center justify-center text-xs text-gray-400 font-bold">
              #1
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate ">
                Tên Bài Tiếp Theo 1
              </p>
              <p className="text-xs text-gray-400 truncate">Nghệ Sĩ Khác</p>
            </div>
            <span className="text-xs text-gray-500 pr-2">3:45</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingSidebar;
