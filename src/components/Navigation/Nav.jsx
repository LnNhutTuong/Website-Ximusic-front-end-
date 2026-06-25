import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { UserContext } from "@/context/userContext";
import { IoMdHome } from "react-icons/io";

const Nav = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  if ((user && user.isAuthenticated) || location.pathname === "/") {
    return (
      <nav className="bg-none text-white px-22 py-4 border-b  ">
        <div className="flex items-center justify-between">
          {/* XimenT */}
          <h1 className="text-xl font-bold ximent flex-1">XiMusic</h1>

          {/* search bar */}
          <div class="h-max flex-1 flex items-center justify-center gap-1">
            <NavLink
              to="/"
              end
              className="bg-white/30 p-2 rounded-xl text-3xl flex items-center justify-center"
            >
              {({ isActive }) => (
                <IoMdHome
                  className={
                    isActive ? "text-white" : "text-black hover:text-white"
                  }
                />
              )}
            </NavLink>
            <div className="w-full">
              <label
                for="search"
                class="block mb-2.5 text-sm font-medium text-heading sr-only "
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
          </div>

          <ul className="flex gap-6 flex-1 justify-end ">
            {user && !_.isEmpty(user) && user.isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/Users"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black-500"
                        : "text-gray-300 hover:text-gray-300"
                    }
                  >
                    List users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/Project"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black-500"
                        : "text-gray-300 hover:text-black-5000"
                    }
                  >
                    Project
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => logoutContext()}
                    className="text-gray-300 hover:text-black-500"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black-500"
                        : "text-gray-300 hover:text-gray-300"
                    }
                  >
                    Login
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "text-black-500"
                        : "text-gray-300 hover:text-gray-300"
                    }
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }
};

export default Nav;
