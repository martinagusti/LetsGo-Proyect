import { useContext, useEffect, useState } from "react";
import {
  allTripsAxios,
  allTripsParams,
  setFavourites,
  getComments,
  tripsByUserName,
  favourites,
  likeTrip,
} from "../../../services";
import { isLike } from "../../../services/";

import PropTypes from "prop-types";
import useTrips from "../../../hooks/useTrips";
import { getDistance } from "../../../utils.js/getDistance";
import "./list.css";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const user = JSON.parse(localStorage.getItem("user"));

function List({
  datos,
  setShowingPage,
  setIdTrip,
  setComments,
  setSelectProfile,
  setUserNameTrips,
  order,
  distance,
  category,
  city,
  liked,
  setInFavourites,
}) {
  const { token, user } = useContext(AuthContext);

  const { loading, error } = useTrips();

  const navigateTo = useNavigate();

  const coord = JSON.parse(localStorage.getItem("ubicacion"));

  setShowingPage("search");
  datos = datos.map((element) => {
    const distancia = getDistance(
      element.latitude,
      element.longitude,
      coord.lat,
      coord.lng
    );
    element.distance = Math.round(distancia);
    element.userImage = element.userImage ? element.userImage : user.image;
    element.userName = element.userName ? element.userName : user.userName;
    element.votes = element.votes ? element.votes : 0;

    return element;
  });

  if (city !== "") {
    datos = datos.filter((element) => {
      return element.city.startsWith(city);
    });
  }

  /* if (category !== "") {
    datos = datos.filter((element) => {
      return element.category === category;
    });
  } */

  datos = datos.filter((element) => {
    return element.distance < distance;
  });

  if (order === "distancia") {
    datos = datos.sort((a, b) => {
      return a.distance - b.distance;
    });
  }

  if (order === "likes") {
    datos = datos.sort((a, b) => {
      return b.votes - a.votes;
    });
  }

  const selectImage = async (dato) => {
    setIdTrip(dato);
    const comments = await getComments(dato.ID);
    setComments(comments);
    setShowingPage("publication");
    navigateTo(`/publication/${dato.ID}`);
  };

  const goToProfile = async (dato) => {
    setUserNameTrips(await tripsByUserName(dato.userName));
    setSelectProfile(dato);
    setShowingPage("profile");
    navigateTo("/profile");
  };

  if (loading) return <p>Cargando viajes...</p>;
  if (error) return <p>{error}</p>;

  if (datos.length === 0) {
    return <p>No trips found...</p>;
  }

  return (
    <>
      {datos.map((element, index) => {
        const date = new Date(element.createAt);
        const date2 = date.toLocaleDateString();
        element.fecha = date2;
      })}

      {datos.map((dato, index) => {
        return (
          <div className="trip-container" key={index}>
            <div className="userImg-container">
              <div className="user-cont">
                <img
                  onClick={() => goToProfile(dato)}
                  className="img-user"
                  src={`${import.meta.env.VITE_BACKEND_URL}/userImages/${
                    dato.userImage ? dato.userImage : "avatar-generico.png"
                  }`}
                />
                <p onClick={() => goToProfile(dato)}>{`${dato.userName}`}</p>
              </div>
            </div>

            <div className="topBox-container">
              <img
                className="img"
                src={`${import.meta.env.VITE_BACKEND_URL}/tripImages/${
                  dato.image
                }`}
                onClick={() => selectImage(dato)}
              />

              <div className="seeMore-container">
                <div
                  className="seeMore"
                  onClick={() => selectImage(dato)}
                ></div>
              </div>

              <div className="topBox">
                <h2 className="list-h2">{dato.city}</h2>
              </div>

              {token && (
                <div className="likes-container">
                  <div
                    className={dato.like === true ? "likes-fill" : "likes"}
                    onClick={() => liked(dato.ID)}
                  ></div>
                </div>
              )}

              {token && (
                <div className="favorites-container">
                  <div
                    className={
                      dato.favourite === true ? "favorites-fill" : "favorites"
                    }
                    onClick={() => {
                      setInFavourites(dato);
                    }}
                  ></div>
                </div>
              )}
            </div>

            <div className="box-bottom">
              <div className="trip-data">
                <p>{`Likes: ${dato.votes}`}</p>
                <p onClick={() => selectImage(dato)}>{`${dato.distance} Km`}</p>

                <p>{dato.fecha}</p>
              </div>

              <hr className="hr-list"></hr>
              <h3 className="excerpt">{dato.excerpt}</h3>
            </div>
          </div>
        );
      })}
      <div className="espacio2"></div>
    </>
  );
}

List.propTypes = {
  datos: PropTypes.array,
  setTrips: PropTypes.func,
  setShowingPage: PropTypes.func,
  setComments: PropTypes.func,
  setSelectProfile: PropTypes.func,
  setUserNameTrips: PropTypes.func,
  showingPage: PropTypes.string,
  order: PropTypes.string,
  distance: PropTypes.number,
  category: PropTypes.string,
  city: PropTypes.string,
  liked: PropTypes.func,
  setInFavourites: PropTypes.func,
};

export default List;
