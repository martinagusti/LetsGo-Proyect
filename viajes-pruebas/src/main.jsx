import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthproviderComponent } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthproviderComponent>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthproviderComponent>
  </React.StrictMode>
);
