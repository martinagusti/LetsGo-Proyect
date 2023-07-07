import axios from "axios";

export const uploadFile = async (idTrip, file, config) => {
    
   const image =  await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/trips/upload/${idTrip}`, file, config)
   return image
};

export const favorites = async (config) => {
   return await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/favourites`, config)
};

export const uploadAvatarFile = async (file, config) => {
    const image = axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/uploadImage`, file, config)
    return image
};

