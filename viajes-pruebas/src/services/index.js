import axios from "axios";

import { login, signUp } from "./authService";
import { uploadFile } from "./fileService";
import { allTripsAxios, allTripsParams } from "./tripService";
import { allTripsParams2 } from "./tripService";
import { getComments } from "./commentService";
import { createComment } from "./commentService";
import { likeTrip } from "./likeService";
import { isLike } from "./likeService";
import { favourites } from "./tripService";
import { tripsByUserName } from "./tripService";
import { setFavourites } from "./tripService";
import { deleteTripService } from "./tripService";
import { editProfile } from "./authService";
import { editTrip } from "./tripService";
import { getNotifications } from "./notificationService";
import { deleteNotifications } from "./notificationService";
import { createNotifications } from "./notificationService";

const isBearerTokenRequired = (url) => {
  const parsedUrl = new URL(url);
  const publicRoutes = ["/api/v1/users/login", "/api/v1/users"];

  if (publicRoutes.includes(parsedUrl.pathname)) {
    return false;
  } else {
    return true;
  }
};

axios.interceptors.request.use(
  function (config) {
    const token = JSON.parse(localStorage.getItem("token"));

    if (token && isBearerTokenRequired(config.url)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    //arreglar aqui
    /*   if(response.data){
        //arreglar aqui
            localStorage.setItem("currentUser", JSON.stringify(response.data))
        } */
    return response;
  },
  function (error) {
    console.log(error);
    if (error.response.request.status === 403) {
      console.log("Usuario o contraseña incorrecto");
    }

    return Promise.reject(error);
  }
);

export {
  login,
  signUp,
  uploadFile,
  allTripsAxios,
  allTripsParams,
  getComments,
  createComment,
  likeTrip,
  favourites,
  tripsByUserName,
  isLike,
  setFavourites,
  deleteTripService,
  editProfile,
  allTripsParams2,
  editTrip,
  getNotifications,
  deleteNotifications,
  createNotifications,
};
