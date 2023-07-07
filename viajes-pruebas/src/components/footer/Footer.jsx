import PropTypes from "prop-types";

import "./footer.css";
import { favourites, tripsByUserName } from "../../services";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Footer({
  setSelectProfile,
  setUserNameTrips,
  setShowingPage,
  setSeeNotifications,
  seeNotifications,
  showingPage,
}) {
  const { token } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigateTo = useNavigate();

  const getProfile = async () => {
    if (user) {
      setSelectProfile(user);
      setUserNameTrips(await tripsByUserName(user.userName));
      setShowingPage("profile");
      navigateTo("/profile");
    } else {
      setShowingPage("login");
      navigateTo("/login");
    }
  };

  const getFavourites = async () => {
    setSelectProfile(user);
    setUserNameTrips(await favourites());
    setShowingPage("favourites");
    navigateTo("/favourites");
  };

  return (
    <div className="footer-container">
      <div
        className={
          showingPage === "search"
            ? "footer-label-container box1 fill"
            : "footer-label-container box1"
        }
        onClick={() => {
          navigateTo("/home");
          setShowingPage("search");
        }}
      >
        <div className="home" id="home"></div>
        <label className="lbl-footer ">Home</label>
      </div>

      {token && (
        <div
          className={
            showingPage === "newtrip"
              ? "footer-label-container box2 fill"
              : "footer-label-container box2"
          }
          onClick={() => {
            navigateTo("/newtrip");
            setShowingPage("newtrip");
          }}
        >
          <div className="new" id="new"></div>

          <label className="lbl-footer">New Trip</label>
        </div>
      )}
      <div
        className={
          showingPage === "maps"
            ? "footer-label-container box3 fill"
            : "footer-label-container box3"
        }
        onClick={() => {
          navigateTo("/maps");
          setShowingPage("maps");
        }}
      >
        <div className="maps" id="maps"></div>

        <label className="lbl-footer">Maps</label>
      </div>

      {token && (
        <div
          className={
            showingPage === "favourites"
              ? "footer-label-container box4 fill"
              : "footer-label-container box4"
          }
          onClick={() => getFavourites("")}
        >
          <div className="favs" id="favourites"></div>
          <label className="lbl-footer">Favourites</label>
        </div>
      )}

      {token && (
        <div
          className={
            showingPage === "profile"
              ? "footer-label-container box5 fill"
              : "footer-label-container box5"
          }
          onClick={() => getProfile()}
        >
          <div className="profile" id="profile">
            {token && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/UserImages/${
                  user?.image ? user.image : "avatar-generico.png"
                }`}
              />
            )}
          </div>
          <label className="lbl-footer index2">
            {user ? user.userName : ""}
          </label>
        </div>
      )}
    </div>
  );
}

export default Footer;
