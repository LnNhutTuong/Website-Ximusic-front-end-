import { useState, useEffect } from "react";
import { Triangle } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";

import questionIcon from "@/assets/static/genre/question_icon.jpg";

import {
  getListAlbum,
  getAlbumWithId,
} from "../../../../../services/music/album/albumService";

import DialogCreateNewAlbum from "./DialogCreateNewAlbum";

import { toast } from "react-toastify";

const ManagerSong = (props) => {
  const [listAlbum, setListAlbum] = useState([]);

  const [isRefresh, setIsRefresh] = useState(false);

  const [showDialogCreate, setShowDialogCreate] = useState(false);

  const [albumData, setAlbumData] = useState("");
  const [showDialogDetail, setShowDialogDetail] = useState(false);

  useEffect(() => {
    handleGetListAlbum();
  }, []);

  const handleGetListAlbum = async () => {
    let res = await getListAlbum();
    if (res?.EC === 0) {
      setListAlbum(res.DT.rows);
    } else {
      setListAlbum([]);

      toast.error(res.EM);
    }
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      setIsRefresh(false);
    }, 3000);
  };

  const handleGetAlbumWithId = async (albumId) => {
    let res = await getAlbumWithId(albumId);
    if (res?.EC === 0) {
      setAlbumData(res.DT);
      toast.success(albumId);
      // setShowDialogDetail(true);
    } else {
      toast.error("Something went wrong when get SONG ID");
    }
  };

  return (
    <>
      <>
        <div className="list-genre-container mx-10 my-5">
          <h1 className="text-xl font-bold">List Song</h1>
          <div className="flex gap-2 my-2 justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDialogCreate(true);
                }}
                class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
              >
                Add new album
              </button>
              <button
                onClick={() => {
                  handleRefresh();
                }}
                class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-lime-800 border-lime-800 text-slate-50 hover:bg-lime-700 hover:border-lime-700"
              >
                Refresh
              </button>
            </div>

            <div>
              <label
                for="search"
                class="block mb-2.5 text-sm font-medium text-heading sr-only "
              >
                Search
              </label>

              <input
                type="search"
                id="search"
                class="block w-full p-3 ps-9 bg-neutral-secondary-medium bg-white/30 rounded-xl text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                placeholder="Search"
                required
              />
              <button
                type="button"
                class="absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none"
              >
                Search
              </button>
            </div>
          </div>

          <div className="relative overflow-x-auto bg-neutral-1primary-soft shadow-xs rounded-base  h-[522px] border border-white/10 rounded-xl mt-3 scrollbar-none">
            {!isRefresh ? (
              listAlbum.length > 0 ? (
                <div className="grid grid-cols-6 gap-4 mx-auto items-center px-24 mt-10">
                  {listAlbum.map((album) => {
                    return (
                      <div
                        className={`${
                          album.releaseDate !== null &&
                          new Date(album.releaseDate) <= new Date()
                            ? "border-green-700 hover:shadow-green-500/22 hover:shadow-xl"
                            : "border-red-700 hover:shadow-red-500/22 hover:shadow-xl"
                        } w-64 aspect-square overflow-hidden rounded-2xl border bg-white/5 backdrop-blur-sm transition duration-300 hover:-translate-y-1  hover:bg-white/10 hover:shadow-xl`}
                      >
                        {/* Thumbnail */}
                        <div
                          className="relative w-45 h-45 mx-auto mt-3 cursor-pointer "
                          onClick={() => handleGetAlbumWithId(album.id)}
                        >
                          <div className="absolute inset-0 translate-x-7 rounded-full bg-zinc-900 z-0 flex items-center justify-center ">
                            <span className="absolute translate-x-18 text-white font-semibold [writing-mode:vertical-rl]">
                              {album.songCount} song
                            </span>
                          </div>

                          <div className="absolute inset-0 rounded-full overflow-hidden z-10 bg-red-900">
                            <img
                              src={`${import.meta.env.VITE_BACKEND_URL}/${album.cover}`}
                              alt="album cover"
                              className="w-full h-full object-cover transition-transform hover:animate-[spin_3s_linear_infinite]"
                            />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-4 py-2 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate text-lg font-semibold text-white">
                                {album.title}
                              </h3>

                              <p className="truncate text-sm text-white/60">
                                {album.artistName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  <p className="flex justify-center items-center font-bold text-white/80 backdrop-blur-xl h-full text-3xl">
                    Not found anything here bb ♥...
                  </p>
                </>
              )
            ) : (
              <div className="flex flex-col justify-center items-center h-full rounded-xl border border-lime-600">
                <Triangle
                  visible={true}
                  height="220"
                  width="220"
                  color="#ffffff"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <span className="text-xl font-bold">Waiting -_-</span>
              </div>
            )}
          </div>

          <div className=" mt-5 flex justify-end items-center">
            <div className="border border-white/20 rounded-2xl w-fit px-5 py-3 text-center">
              <span className="font-bold ">Date & Time</span> <br />
              26/08/2005 | 11:00 PM
            </div>
          </div>
        </div>
      </>

      <DialogCreateNewAlbum
        show={showDialogCreate}
        setShow={setShowDialogCreate}
      />
    </>
  );
};

export default ManagerSong;
