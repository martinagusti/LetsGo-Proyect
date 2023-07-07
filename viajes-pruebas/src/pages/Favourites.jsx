import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  signUp,
  uploadFile,
  getComments,
  allTripsAxios,
  tripsByUserName,
} from "../services";

import "./favourites.css";
import { getDistance } from "../utils.js/getDistance";
import { useNavigate } from "react-router-dom";

function Favourites(
  {
    setIdTrip,
    setComments,
    selectProfile,
    userNameTrips,
    setUserNameTrips,
    setInFavourites,
  },
  userTrips
) {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigateTo = useNavigate();

  const coord = JSON.parse(localStorage.getItem("ubicacion"));

  userNameTrips = userNameTrips.map((element) => {
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

  const selectImage = async (dato) => {
    setIdTrip(dato);
    const comments = await getComments(dato.ID);
    setComments(comments);
    navigateTo(`/publication/${dato.ID}`);
  };

  const deleteFavourite = async (dato) => {
    setInFavourites(dato);
    await setUserNameTrips(
      userNameTrips.filter((element) => {
        return element.ID !== dato.ID;
      })
    );
  };

  return (
    <div className="profile-container">
      <div className="user">
        <div>
          <div className="img-cont">
            <img
              className="image-profile"
              src={`${import.meta.env.VITE_BACKEND_URL}/userImages/${
                userNameTrips[0].userImage || user.image
              }`}
              alt="avatar"
            />
          </div>

          <h3>{userNameTrips[0].userName}</h3>
        </div>

        <p>{userNameTrips.length} Favourites</p>
      </div>

      <div className="userName-trips">
        {userNameTrips.map((dato, index) => {
          return (
            <div className="userTrip-container" key={index}>
              <img
                className="user-images"
                src={`${import.meta.env.VITE_BACKEND_URL}/tripImages/${
                  dato.image
                }`}
                onClick={() => selectImage(dato)}
              />
              <button
                className="btn-deleteFavourite"
                onClick={() => {
                  deleteFavourite(dato);
                }}
              ></button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Favourites;
