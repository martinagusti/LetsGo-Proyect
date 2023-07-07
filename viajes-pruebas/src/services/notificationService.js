import axios from "axios";

export const getNotifications = async (id) => {
  if (id) {
    let notifications = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/notifications/${id}`
    );

    return notifications.data;
  }
};

export const deleteNotifications = async (id) => {
  let notifications = await axios.delete(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/notifications/delete/${id}`
  );

  return notifications.data;
};

export const createNotifications = async (idTrip, action) => {
  let notifications = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/notifications/create/${idTrip}`,
    { action }
  );

  return notifications.data;
};
