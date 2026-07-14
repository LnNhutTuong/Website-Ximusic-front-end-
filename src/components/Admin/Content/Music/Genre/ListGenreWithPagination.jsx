import { Triangle } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DialogCreateNewGenre from "./DialogCreateNewGenre";
import DialogGenreDetail from "./DialogGenreDetail";
import {
  fetchAllGenre,
  getGenreWithId,
} from "../../../../../services/music/genre/genreService";
import questionIcon from "@/assets/static/genre/question_icon.jpg";
const ManagerGenre = (props) => {
  const [listGenre, setListGenre] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const currentLimit = 12;

  // Refresh
  const [isRefresh, setIsRefresh] = useState(false);

  //Dialog Create Genre
  const [dataGenre, setDataGenre] = useState("");
  const [showDialogCreate, setShowDialogCreate] = useState(false);

  //Dialog Genre Detail
  const [showDialogDetail, setShowDialogDetail] = useState(false);

  const handleRefresh = () => {
    setIsRefresh(true);
    setTimeout(() => {
      setIsRefresh(false);
    }, 3000);
  };

  useEffect(() => {
    getListGenre();
  }, [currentPage, currentLimit]);

  const getListGenre = async () => {
    let res = await fetchAllGenre(currentPage, currentLimit);
    if (res?.EC === 0) {
      setListGenre(res.DT.rows);

      let totalGenre = +res.DT.count;

      let pageCount = Math.ceil(totalGenre / currentLimit);

      const pageArray = [];
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }

      setTotalPage(pageArray);
    } else {
      setListGenre([]);
      setTotalPage([]);
      toast.error(res.EM);
    }
  };

  const handleGetGenreWithId = async (genreId) => {
    let res = await getGenreWithId(genreId);

    if (res?.EC === 0) {
      setDataGenre(res.DT);
    }
  };

  return (
    <>
      <>
        <div className="list-genre-container mx-10 my-5">
          <h1 className="text-xl font-bold">List Genres</h1>
          <div className="flex gap-2 my-2 justify-between">
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowDialogCreate(true);
                }}
                class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
              >
                Add new genre
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
              listGenre.length > 0 ? (
                <div className="grid grid-cols-8 gap-4 mx-auto items-center px-24 mt-10">
                  {listGenre.map((genre) => (
                    <div
                      className="col-span-2 flex h-30 overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm 
                    duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-xl transition border border-white"
                    >
                      <img
                        src={
                          genre.icon
                            ? `${import.meta.env.VITE_BACKEND_URL}/${genre.icon}`
                            : questionIcon
                        }
                        alt=""
                        className="h-full w-30 object-cover"
                      />
                      <span className="border mx-3 my-3" />
                      <div className="flex flex-1 flex-col pe-2 py-3 ">
                        <div className="flex justify-between border-b">
                          <h3 className="text-lg font-bold ">
                            {genre.name.toUpperCase()}
                          </h3>
                          <button
                            className="px-2 rounded-xl mb-2 text-white/60 hover:text-white hover:cursor-pointer"
                            onClick={async () => {
                              setShowDialogDetail(true);
                              await handleGetGenreWithId(genre.id);
                            }}
                          >
                            View
                          </button>
                        </div>
                        <p className="mt-2 line-clamp-2 text-sm text-white/80 overflow-hidden">
                          {genre.description}
                        </p>
                        <p className="mt-auto pt-3 text-xs text-white/60">
                          Song count:{" "}
                          <span className="text-white font-bold">
                            {genre.songCount}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="flex justify-center items-center font-bold text-red-600 h-full text-3xl">
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

      <DialogCreateNewGenre
        show={showDialogCreate}
        setShow={setShowDialogCreate}
        fetchAllGenre={getListGenre}
      />
      <DialogGenreDetail
        show={showDialogDetail}
        setShow={setShowDialogDetail}
        dataGenre={dataGenre}
        fetchAllGenre={getListGenre}
      />
    </>
  );
};

export default ManagerGenre;
