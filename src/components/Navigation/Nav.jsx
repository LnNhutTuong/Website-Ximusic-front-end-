import { NavLink, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import _ from "lodash";
import { UserContext } from "@/context/userContext";
const Nav = (props) => {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  if ((user && user.isAuthenticated) || location.pathname === "/") {
    return (
      <nav className="bg-gray-900 text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">MyApp</h1>

          <ul className="flex gap-6">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500"
                    : "text-gray-300 hover:text-gray-300"
                }
              >
                Home
              </NavLink>
            </li>
            {user && !_.isEmpty(user) && user.isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/Users"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500"
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
                        ? "text-blue-500"
                        : "text-gray-300 hover:text-blue-5000"
                    }
                  >
                    Project
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => logoutContext()}
                    className="text-gray-300 hover:text-blue-500"
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
                        ? "text-blue-500"
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
                        ? "text-blue-500"
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
