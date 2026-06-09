import { useEffect, useState } from "react";
import { fetchAllUser } from "../../../services/userService";
import { useSearchParams } from "react-router-dom";
import DialogCreateUser from "./DialogCreateUser";

const ListUser = () => {
  const [listUser, setListUser] = useState([]);
  const [totalPage, setTotalPage] = useState([]);

  // Dialog Create User
  const [dialogCreate, setDialogCreate] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page"), 10) || 1;
  const currentLimit = parseInt(searchParams.get("limit"), 10) || 1;

  useEffect(() => {
    getListUser();
  }, [currentPage, currentLimit]);

  const getListUser = async () => {
    let res = await fetchAllUser(currentPage, currentLimit);
    if (res?.data?.EC === 0) {
      setListUser(res.data.DT.rows);

      let totalUser = +res.data.DT.count;

      let pageCount = Math.ceil(totalUser / currentLimit);

      const pageArray = [];
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }

      setTotalPage(pageArray);
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

  return (
    <>
      <div className="list-user-container">
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
          <button class="inline-flex items-center justify-center border align-middle select-none font-sans font-medium text-center transition-all duration-300 ease-in disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed data-[shape=pill]:rounded-full data-[width=full]:w-full focus:shadow-none text-sm rounded-md py-2 px-4 shadow-sm hover:shadow-md bg-lime-800 border-lime-800 text-slate-50 hover:bg-lime-700 hover:border-lime-700">
            Refresh
          </button>
        </div>

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
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
                  Username
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
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
              {listUser.map((user) => (
                <tr className="bg-neutral-primary border-b border-default">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                  >
                    {user.id}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">
                    {user.Group ? user.Group.name : "No group"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(user.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <a className="border-b" href="update-page/<%= user.id %>">
                      Edit
                    </a>
                    <form action="/delete-user/<%= user.id %>" method="POST">
                      <button>Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="footer mt-10 text-center">
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
      </div>

      <DialogCreateUser show={dialogCreate} setShow={setDialogCreate} />
    </>
  );
};

export default ListUser;
