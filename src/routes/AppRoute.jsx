import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import ManagerUser from "../components/Manager/ManageUser/index";
import ManageProject from "../components/Manager/ManageProject/index";

import PrivateRoutes from "./PrivateRoutes";
const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />

        {/* private route */}
        <Route element={<PrivateRoutes />}>
          <Route path="/users" element={<ManagerUser />} />
          <Route path="/project" element={<ManageProject />} />
        </Route>

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
