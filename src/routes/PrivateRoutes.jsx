import { useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import _ from "lodash";
import { useState } from "react";
const PrivateRoutes = (props) => {
  const account = JSON.parse(sessionStorage.getItem("account"));

  return account?.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
