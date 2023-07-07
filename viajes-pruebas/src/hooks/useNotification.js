import { useContext, useEffect, useState } from "react";
import { getNotifications } from "../services";
import { AuthContext } from "../context/AuthContext";

const useNotification = () => {
  const { setToken, setUser, token, user } = useContext(AuthContext);

  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNotification = async () => {
      try {
        setLoading(true);
        if (user) {
          const notificationData = await getNotifications(user.id);
          setNotification(notificationData);
        }
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadNotification();
  }, [token]);

  return { notification, loading, error, setNotification };
};

export default useNotification;
