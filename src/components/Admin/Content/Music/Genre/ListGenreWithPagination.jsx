import { Triangle } from "react-loader-spinner";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DialogCreateNewGenre from "./DialogCreateNewGenre";
import { fetchAllGenre } from "../../../../../services/music/genre/genreService";
const ManagerGenre = (props) => {
  const [listGenre, setListGenre] = useState([]);
  const [totalPage, setTotalPage] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const currentLimit = 7;

  // Refresh
  const [isRefresh, setIsRefresh] = useState(false);

  //Dialog Create Genre
  const [showDialogCreate, setShowDialogCreate] = useState(false);

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

      let totalUser = +res.DT.count;

      let pageCount = Math.ceil(totalUser / currentLimit);

      const pageArray = [];
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }

      setTotalPage(pageArray);
    } else {
      setListUser([]);
      setTotalPage([]);
      toast.error(res.EM);
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

              <div class="absolute inset-y-0 start-0 flex items-center pointer-events-none">
                <svg
                  class="w-4 h-4 text-body"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-width="2"
                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
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

          <div className="relative o1verflow-x-auto bg-neutral-1primary-soft shadow-xs rounded-base  h-[522px] border border-white/10 rounded-xl mt-3 scrollbar-none">
            {!isRefresh ? (
              listGenre.length > 0 ? (
                <div className="grid grid-cols-8 gap-4 mx-auto items-center px-24 mt-10">
                  {listGenre.map((genre) => (
                    <div className="col-span-2 flex h-30 overflow-hidden rounded-xl border">
                      {console.log(
                        `>>>check url icons: ${import.meta.env.VITE_BACKEND_URL}/${genre.icon}`,
                      )}
                      <img
                        src={
                          genre.icon
                            ? `${import.meta.env.VITE_BACKEND_URL}/${genre.icon}`
                            : "/image/question_icon.jpg"
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
                          <button className=" px-2 rounded-xl mb-2 text-white/60 hover:text-white hover:cursor-pointer">
                            View
                          </button>
                        </div>

                        <p className="mt-1 line-clamp-3 text-sm text-white/80 overflow-y-auto scrollbar-none">
                          {genre.description}
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
            {/* <div className="border border-white/20 rounded-2xl w-fit px-2 py-3">
              <span className="font-bold text-red-600">Caution:</span> Click
              <span className="px-2 py-1 bg-blue-600 rounded-xl mx-2 font-bold">
                ARTIST
              </span>
              or
              <span className="px-2 py-1 bg-white text-black font-bold rounded-xl mx-2">
                LISTENER
              </span>
              in the Group column to view the corresponding Artist or Listener
              profile.
            </div> */}
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
    </>
  );
};

export default ManagerGenre;
