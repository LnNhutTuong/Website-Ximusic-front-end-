import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLoadingAuth: true,
    isAuthenticated: false,
    token: "",
    account: {},
  });

  const navigate = useNavigate();

  const loginContext = (userData) => {
    setUser({ ...userData, isLoadingAuth: false });
  };

  const logoutContext = () => {
    setUser({
      isLoadingAuth: false,
      isAuthenticated: false,
      token: "",
      account: {},
    });
    navigate("/");
  };

  const fetchUser = async () => {
    try {
      let res = await getUserAccount();
      console.log(">>>>>>>>check res fetchUser: ", res);
      if (res && res.EC === 0) {
        let data = {
          isLoadingAuth: false,
          isAuthenticated: true,
          token: res.token,
          account: {
            email: res.email,
            username: res.username,
            groupWithRoles: res.groupWithRoles,
          },
        };
        setTimeout(() => {
          setUser(data);
        }, 2200);
      } else {
        setUser({
          isLoadingAuth: false,
          isAuthenticated: false,
          token: "None",
          account: {},
        });
      }
    } catch (error) {
      setUser({
        isLoadingAuth: false,
        isAuthenticated: false,
        token: "Error Fetch",
        account: {},
      });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
