import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./components/Navigation/Nav";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ManagerUser from "./components/Manager/ManageUser/index";
import _ from "lodash";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session));
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/" end element={<h1>Home</h1>} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Users */}
          {account && !_.isEmpty(account) && account.isAuthenticated ? (
            <Route path="/users" end element={<ManagerUser />} />
          ) : (
            <Route path="/users" end element={<Login />} />
          )}
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
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
    </Router>
  );
};

export default App;
