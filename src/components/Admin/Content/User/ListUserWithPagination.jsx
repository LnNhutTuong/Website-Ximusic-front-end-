import { useContext, useEffect, useState } from "react";
import {
  fetchAllUser,
  handleDeleteUser,
  handleGetUserWithId,
} from "../../../../services/userService";
import { useSearchParams } from "react-router-dom";
import DialogCreateUser from "./DialogCreateUser";
import DialogDetailUser from "./DialogDetailUser";
import DialogArtistProfile from "./DialogArtistProfile";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";

const ListUser = () => {
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState([]);

  // Refresh
  const [isRefresh, setIsRefresh] = useState(false);

  // Dialog Create User
  const [dialogCreate, setDialogCreate] = useState(false);

  //Dialog Detail User
  const [detailUser, setDetailUser] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [dialogDetailUser, setDialogDetailUser] = useState(false);

  //Dialog Artist Profile
  const [dialogArtistProfile, setDialogArtistProfile] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const currentLimit = 7;

  useEffect(() => {
    getListUser();
  }, [currentPage, currentLimit]);

  const getListUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res?.EC === 0) {
      setListUser(res.DT.rows);

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

  const handlePageChange = (type) => {
    if (type === "next") {
      if (currentPage >= totalPage.length) return;
      setSearchParams({
        page: +currentPage + 1,
        limit: +currentLimit,
      });
    } else {
      if (currentPage <= 1) return;
      setSearchParams({
        page: +currentPage - 1,
        limit: +currentLimit,
      });
    }
  };

  const handleChoosePageNumber = (pageNumber) => {
    setSearchParams({
      page: +pageNumber,
      limit: +currentLimit,
    });
  };

  const handleGetDataUser = async (idUser) => {
    let res = await handleGetUserWithId(idUser);
    if (res?.EC === 0) {
      setDetailUser(res.DT);
    }
  };

  const handleDelete = async (idUser) => {
    let res = await handleDeleteUser(idUser);
    if (res?.EC === 0) {
      toast.success(res.EM);
      getListUser();
    } else {
      toast.error(res.EM);
    }
  };

  const handleRefresh = () => {
    setIsRefresh(true);
    getListUser();
    setTimeout(() => {
      setIsRefresh(false);
    }, 3000);
  };

  return (
    <>
      {!isRefresh ? (
        <>
          <div className="list-user-container mx-10 my-5">
            <h1 className="text-xl font-bold">List Users</h1>
            <div className="flex gap-2 my-2">
              <button
                onClick={() => {
                  setDialogCreate(true);
                }}
                class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-slate-800 border-slate-800 text-slate-50 hover:bg-slate-700 hover:border-slate-700"
              >
                Add new user
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

            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base  h-[522px]">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      displayName
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 font-medium text-center"
                    >
                      Group
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Created
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Updated
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listUser ? (
                    listUser.map((user) => (
                      <tr className="bg-neutral-primary border-b border-default">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                        >
                          {user.id}
                        </th>
                        <td
                          className="px-6 py-4"
                          onClick={() => {
                            (setDialogDetailUser(true),
                              handleGetDataUser(user.id));
                          }}
                        >
                          <span className="rounded-xl relative hover:bottom-1 hover:cursor-pointer hover:underline">
                            {user.email}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4"
                          onClick={() => {
                            (setDialogDetailUser(true),
                              handleGetDataUser(user.id));
                          }}
                        >
                          <span className="rounded-xl relative hover:bottom-1 hover:cursor-pointer hover:underline">
                            {user.displayName}
                          </span>
                        </td>

                        <td
                          class={`flex justify-center items-center font-bold`}
                        >
                          <div
                            className={`w-fit px-2 py-1 rounded-xl ${
                              user.group?.name === "Admin"
                                ? "bg-red-900"
                                : user.group?.name === "Artist"
                                  ? "bg-blue-700 relative hover:bottom-1 hover:bg-blue-900 hover:cursor-pointer"
                                  : "bg-white text-black"
                            }`}
                            onClick={
                              user.groupId === 2
                                ? () => {
                                    (setDialogArtistProfile(true),
                                      setIsArtist(true),
                                      handleGetDataUser(user.id));
                                  }
                                : undefined
                            }
                          >
                            {user.group
                              ? user.group.name.toUpperCase()
                              : "No group"}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {new Date(user.createdAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(user.updatedAt).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 flex gap-2 ">
                          <Button
                            variant="warning"
                            onClick={() => {
                              (setDialogDetailUser(true),
                                handleGetDataUser(user.id));
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>not found any user</>
                  )}
                </tbody>
              </table>
            </div>

            <div className="footer mt-5 text-center">
              <nav aria-label="Page navigation">
                <ul class="inline-flex -space-x-px">
                  <li>
                    <button
                      class="px-3 py-2 ml-0 leading-tight text-black bg-white border border-black rounded-l-lg hover:bg-gray-100 hover:text-black"
                      onClick={() => handlePageChange("prev")}
                    >
                      Previous
                    </button>
                  </li>
                  {totalPage.map((page) => (
                    <li key={page}>
                      <button
                        className={
                          page === +currentPage
                            ? "px-3 py-2 leading-tight text-white bg-black border border-black font-bold"
                            : "px-3 py-2 leading-tight text-black bg-white border border-black hover:bg-gray-100 hover:text-black"
                        }
                        onClick={() => {
                          handleChoosePageNumber(page);
                        }}
                      >
                        {page}
                      </button>
                    </li>
                  ))}

                  <li>
                    <button
                      class="px-3 py-2 ml-0 leading-tight text-black bg-white border border-black rounded-r-lg hover:bg-gray-100 hover:text-black"
                      onClick={() => handlePageChange("next")}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className=" mt-5 border border-white/20 rounded-2xl w-fit px-2 py-3">
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
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-full border">
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
      <DialogCreateUser
        show={dialogCreate}
        setShow={setDialogCreate}
        fetchAllUser={getListUser}
      />
      <DialogDetailUser
        show={dialogDetailUser}
        setShow={setDialogDetailUser}
        fetchAllUser={getListUser}
        detailUser={detailUser}
        isEditMode={isEditMode}
      />

      {isArtist && (
        <DialogArtistProfile
          show={dialogArtistProfile}
          setShow={setDialogArtistProfile}
          detailUser={detailUser}
          setIsArtist={setIsArtist}
        />
      )}
    </>
  );
};

export default ListUser;
