import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider, UserContext } from "./context/userContext";
import { PlayerProvider } from "./context/musicContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <UserProvider>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </UserProvider>
  </BrowserRouter>,
  // </StrictMode>,
);
