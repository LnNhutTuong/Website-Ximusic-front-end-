import React, { createContext, useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const loginContext = (userData) => {
    setUser(userData);
  };

  const logoutContext = () => {
    setUser({
      name: "",
      auth: false,
    });
  };

  const fetchUser = async () => {
    let res = await getUserAccount();
    if (res && res.EC === 0) {
      let data = {
        isAuthenticated: true,
        token: res.token,
        account: {
          email: res.email,
          username: res.username,
          groupWithRoles: res.groupWithRoles,
        },
      };
      setUser(data);
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
