import { useContext, useState } from "react";
import Header from "../components/headers/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Login from "../pages/Login.jsx";
import ReactPlayer from "react-player";
import video from "../assets/videofondo.mp4";
import { useNavigate } from "react-router-dom";

import "./initial.css";
import { AuthContext } from "../context/AuthContext.jsx";

function Initial({ showingPage, setShowingPage }) {
  const navigateTo = useNavigate();
  const { token, user } = useContext(AuthContext);

  if (token) {
    setShowingPage("search");
    navigateTo("/home");
  }
  return (
    <div className="container">
      <div>
        <video autoPlay loop muted>
          <source src={video} type="video/mp4" />
        </video>

        <h4 className="letra-h4">TOURS & TRAVEL</h4>
        <h1 className="letra-h1">Let´s Discover The World Together</h1>
      </div>
    </div>
  );
}

export default Initial;
