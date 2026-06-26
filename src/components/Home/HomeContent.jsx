import { Swiper, SwiperSlide } from "swiper/react";

const HomeContent = (props) => {
  return (
    <div className="flex-1 h-[calc(100%-30px)] bg-white/20 rounded-xl overflow-y-auto space-y-4 p-3 scrollbar-none mb-3">
      <div className="h-56 rounded-xl overflow-hidden">
        <Swiper
          slidesPerView={1}
          autoplay={{ delay: 1000 }}
          loop={true}
          className="h-full"
        >
          <SwiperSlide>
            <div className="h-full flex items-center justify-center bg-red-500 ">
              Banner 1
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="h-full flex items-center justify-center bg-blue-500">
              Banner 2
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="rounded-xl bg-stone-900/80 h-50">
        <div className="p-3 flex gap-1 text-sm">
          <button className="border border-white rounded-xl px-3 ">All</button>
          <button className="border border-white rounded-xl px-3">Music</button>
          <button className="border border-white rounded-xl px-3">
            PodCasts
          </button>
        </div>
        <div className="grid grid-cols-3 gap-3 px-2">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
            <img
              src="https://picsum.photos/60"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-medium">Haisam</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
            <img
              src="https://picsum.photos/60"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-medium">Haisam</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
            <img
              src="https://picsum.photos/60"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-medium">Haisam</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
            <img
              src="https://picsum.photos/60"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-medium">Haisam</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
            <img
              src="https://picsum.photos/60"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-medium">Haisam</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10">
            <img
              src="https://picsum.photos/60"
              className="w-12 h-12 rounded-md object-cover"
            />
            <div>
              <p className="text-sm font-medium">Haisam</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-84 bg-stone-900/80 flex rounded-xl overflow-hidden">
        <div className=" flex-1 flex flex-col border-r border-dashed ">
          <h1 className="font-bold text-xl px-10 py-3 ">New Podcast</h1>
          <div className="flex-1 flex  gap-3 p-4 hover:bg-white/10 ">
            <div className="w-50 h-full bg-blue-900 rounded-md overflow-hidden">
              <img
                src="https://picsum.photos/60"
                className=" w-full h-full object-cover "
              />
            </div>

            <div className="w-73">
              <h1 className="text-xl font-medium">
                Nhân hơi sơ, ăn khô miệng.
              </h1>
              <h1 className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium ipsum quod atque sit obcaecati, voluptates illo
                fugiat beatae labore facere eveniet consequuntur excepturi hic
                dolorem voluptatem ullam qui tempore itaque!
              </h1>
              <div className="flex justify-end mt-6">
                <button className="border border-white rounded-xl px-3 ">
                  play it...
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex-1/22">
          <h1 className="font-bold text-xl px-10 py-3 text-white">New Album</h1>
          <div className="flex">
            <div className="px-3">
              <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
                <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/300"
                    className="w-full h-full object-cover"
                    alt="Album cover"
                  />
                </div>

                <div className="w-full pt-1">
                  <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                    Nhân hơi sơ, ăn khô miệng.
                  </h3>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
                <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/300"
                    className="w-full h-full object-cover"
                    alt="Album cover"
                  />
                </div>

                <div className="w-full pt-1">
                  <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                    Nhân hơi sơ, ăn khô miệng.
                  </h3>
                </div>
              </div>
            </div>
            <div className="px-3">
              <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
                <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                  <img
                    src="https://picsum.photos/300"
                    className="w-full h-full object-cover"
                    alt="Album cover"
                  />
                </div>

                <div className="w-full pt-1">
                  <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                    Nhân hơi sơ, ăn khô miệng.
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-84 bg-stone-900/80 flex flex-col rounded-xl overflow-hidden">
        <h1 className="font-bold text-xl px-10 py-3 ">Recents</h1>
        <div className="flex justify-center gap-2">
          <div className="px-3">
            <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
              <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  className="w-full h-full object-cover"
                  alt="Album cover"
                />
              </div>

              <div className="w-full pt-1">
                <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                  Nhân hơi sơ, ăn khô miệng.
                </h3>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
              <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  className="w-full h-full object-cover"
                  alt="Album cover"
                />
              </div>

              <div className="w-full pt-1">
                <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                  Nhân hơi sơ, ăn khô miệng.
                </h3>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
              <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  className="w-full h-full object-cover"
                  alt="Album cover"
                />
              </div>

              <div className="w-full pt-1">
                <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                  Nhân hơi sơ, ăn khô miệng.
                </h3>
              </div>
            </div>
          </div>
          <div className="px-3">
            <div className="flex flex-col gap-3 p-2 hover:bg-white/10 w-56 rounded-xl cursor-pointer transition-all duration-200">
              <div className="w-full aspect-square bg-blue-900 rounded-lg overflow-hidden">
                <img
                  src="https://picsum.photos/300"
                  className="w-full h-full object-cover"
                  alt="Album cover"
                />
              </div>

              <div className="w-full pt-1">
                <h3 className="text-base font-semibold text-white line-clamp-2 leading-snug">
                  Nhân hơi sơ, ăn khô miệng.
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
