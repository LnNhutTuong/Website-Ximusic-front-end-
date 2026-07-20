import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Admin from "@/pages/Admin";
import ManagerUser from "../components/Admin/Content/User/ListUserWithPagination";
import ManagerGenre from "../components/Admin/Content/Music/Genre/ListGenreWithPagination";
import ManageAlbum from "../components/Admin/Content/Music/Album/ListAlbum";
import ManageSong from "../components/Admin/Content/Music/Song/ListSongWithPagination";

import Home from "@/pages/Home";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoute";
const AppRoutes = (props) => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* private route */}
        <Route element={<PrivateRoutes />}>
          <Route path="admin" element={<Admin />}>
            <Route path="users" element={<ManagerUser />} />
            <Route path="genre" element={<ManagerGenre />} />
            <Route path="album" element={<ManageAlbum />} />
            <Route path="song" element={<ManageSong />} />
          </Route>
        </Route>

        {/* Auth */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
