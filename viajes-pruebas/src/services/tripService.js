import axios from "axios";
import { isLike } from "./likeService";

export const allTripsAxios = async () => {};

export const allTripsParams = async (params) => {
  try {
    let viajes = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips?${
        params ? params : `limit=10&offset=0`
      }`
    );

    viajes = viajes.data;

    /*  viajes.map(async(element) => {
               const like = await isLike(element.ID) 
               element.like = like.data?.length > 0 ? true : false
              
            })
           
            viajes.map(async(trip) => {
              const favoritos =  await favourites() 
             if( favoritos.filter((element) => {
               return element.ID === trip.ID
              }).length > 0){
               return trip.favourite = true
              }else{
               return trip.favourite = false
              }
             
              
            }) */

    return viajes;
  } catch (error) {
    console.log(error);
  }
};

export const allTripsParams2 = async (params) => {
  try {
    let viajes = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips?${params}`
    );

    viajes = viajes.data;

    return viajes;
  } catch (error) {
    console.log(error);
  }
};

export const tripsById = async () => {
  let viajes = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/30`
  );

  return viajes.data;
};

export const createTrip = async (
  title,
  dateExperience,
  category,
  city,
  excerpt,
  description,
  latitude,
  longitude
) => {
  return await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/create`,
    {
      title,
      dateExperience,
      category,
      city,
      excerpt,
      description,
      latitude,
      longitude,
    }
  );
};

export const favourites = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    let viajes = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/favourites`
    );

    return viajes.data;
  }
};

export const setFavourites = async (id) => {
  return await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/favourites/${id}`
  );
};

export const tripsByUserName = async (username) => {
  let viajes = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/userName/${username}`
  );
  return viajes.data;
};

export const deleteTripService = async (id) => {
  return await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/${id}`
  );
};

export const editTrip = async (
  id,
  title,
  dateExperience,
  category,
  city,
  excerpt,
  description,
  latitude,
  longitude
) => {
  return axios.patch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/updateTrip/${id}`,
    {
      title,
      dateExperience,
      category,
      city,
      excerpt,
      description,
      latitude,
      longitude,
    }
  );
};

export const getTripById = async (id) => {
  const trip = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/${id}`
  );
  return trip.data;
};
