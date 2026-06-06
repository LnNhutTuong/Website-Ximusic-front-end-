import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import AppRoutes from "./routes/AppRoute";
import { useEffect, useState } from "react";
import Nav from "./components/Navigation/Nav";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <div className="app-container">
          <div className="app-header">
            <Nav />
          </div>
          <div className="app-content">
            <AppRoutes />
          </div>
        </div>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default App;
