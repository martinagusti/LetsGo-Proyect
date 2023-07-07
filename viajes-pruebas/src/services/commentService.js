import axios from "axios";

export const getComments = async (idTrip) => {
  let comments = await axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/comentaries/${idTrip}`
  );

  return comments.data;
};

export const createComment = async (idTrip, comentaries) => {
  let comments = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/comentaries/create/${idTrip}`,
    {
      comentaries,
    }
  );

  return comments.data;
};
