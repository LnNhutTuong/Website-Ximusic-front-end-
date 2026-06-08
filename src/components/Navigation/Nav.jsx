import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import _ from "lodash";
const Nav = (props) => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  const handleLogout = () => {
    if (account) {
      sessionStorage.removeItem("account");
    }
    window.location.reload();
  };

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
                isActive ? "text-blue-500" : "text-gray-300 hover:text-gray-300"
              }
            >
              Home
            </NavLink>
          </li>
          {account && !_.isEmpty(account) && account.isAuthenticated ? (
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
                  onClick={() => handleLogout()}
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
};

export default Nav;
