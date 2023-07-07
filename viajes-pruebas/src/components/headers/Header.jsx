import PropTypes from "prop-types";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import "./header.css";

function Header({
  handleOnChange,
  distance,
  city,
  category,
  order,
  handleOnChangeCity,
  handleOnChangeCategory,
  setShowingPage,
  showingPage,
  handleOnChangeOrder,
  setSeeNotifications,
  seeNotifications,
  notification,
}) {
  const { setToken, setUser } = useContext(AuthContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const navigateTo = useNavigate();

  const getNotifications = () => {
    setSeeNotifications(!seeNotifications);
  };

  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("params");
    setToken(null);
    setUser(null);
    setShowingPage("initial");
    navigateTo("/");
    setSeeNotifications(false);
  };

  return (
    <div className="header-container">
      <div className="pages">
        <div className="logo-map"></div>
        {showingPage !== "search" &&
          showingPage !== "profile" &&
          showingPage !== "newtrip" &&
          showingPage !== "maps" &&
          showingPage !== "favourites" &&
          showingPage !== "publication" && (
            <Link
              to="/home"
              onClick={() => {
                setShowingPage("search");
              }}
            >
              Home
            </Link>
          )}

        {!user && showingPage !== "login" && (
          /*  <button onClick={() => setShowingPage("login")}>Login</button> */

          <Link
            to="/login"
            onClick={() => {
              setShowingPage("login");
            }}
          >
            Login
          </Link>
        )}

        {!user && showingPage !== "register" && (
          <Link
            to="/register"
            onClick={() => {
              setShowingPage("register");
            }}
          >
            Register
          </Link>
        )}

        <div className="notification-logout-container">
          {user && (
            <div
              className={
                notification?.length === 0 ? "notifications" : "notifications2"
              }
              id="notifications"
              onClick={() => getNotifications()}
            ></div>
          )}

          {user && (
            <div
              className="logout-container"
              onClick={() => {
                logout();
              }}
            >
              <div className="btn-logout"></div>
              <p>Logout</p>
            </div>
          )}
        </div>
      </div>

      {showingPage === "search" && (
        <div className="box-header">
          {showingPage === "search" && (
            <nav className="header-nav">
              <select
                name="Category"
                id="lang"
                onChange={handleOnChangeCategory}
                value={category}
              >
                <option value="">All Categories</option>
                <option value="viaje-cultural">Cultural</option>
                <option value="viaje-diversion">Diversion</option>
                <option value="viaje-familiar">Familiar</option>
                <option value="viaje-gastronomico">Gastronomico</option>
                <option value="viaje-naturaleza">Naturaleza</option>
                <option value="viaje-negocios">Negocios</option>
                <option value="viaje-playero">Playero</option>
                <option value="viaje-rural">Rural</option>
                <option value="viaje-low-cost">Low-Cost</option>
              </select>

              {!city && (
                <select
                  name="distance"
                  id="distance"
                  onChange={handleOnChange}
                  value={distance}
                >
                  <option value="24000">Max Distance</option>
                  <option value="50">50 Km</option>
                  <option value="100">100 Km</option>
                  <option value="200">200 Km</option>
                  <option value="500">500 Km</option>
                  <option value="1000">1000 Km</option>
                  <option value="1500">1500 Km</option>
                  <option value="5000">5000 Km</option>
                  <option value="10000">10000 Km</option>
                  <option value="24000">24000 Km</option>
                </select>
              )}

              <select
                name="order"
                id="order"
                onChange={handleOnChangeOrder}
                value={order}
              >
                <option value="fechapublicacion">Order By</option>
                <option value="fechapublicacion">Date</option>
                <option value="distancia">Distance</option>
                <option value="likes">Likes</option>
              </select>

              <input
                type="string"
                placeholder="City"
                onChange={handleOnChangeCity}
                value={city}
              />
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  favourites: PropTypes.func,
  all: PropTypes.func,
  handleOnChange: PropTypes.func,
  distance: PropTypes.number,
  city: PropTypes.string,
  category: PropTypes.string,
  order: PropTypes.string,
  handleOnChangeCity: PropTypes.func,
  handleOnChangeCategory: PropTypes.func,
  ok: PropTypes.func,
  handleOnChangeOrder: PropTypes.func,
  setTrips: PropTypes.func,
};

export default Header;
