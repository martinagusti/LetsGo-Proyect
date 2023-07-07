import {
  deleteNotifications,
  getComments,
  getNotifications,
} from "../../services";
import { useNavigate } from "react-router-dom";
import "./notification.css";

function Notification({
  notification,
  setNotification,
  setComments,
  setShowingPage,
  setSeeNotifications,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigateTo = useNavigate();

  const selectImage = async (idTrip) => {
    const comments = await getComments(idTrip);
    setComments(comments);
    setShowingPage("publication");
    navigateTo(`/publication/${idTrip}`);
    setSeeNotifications(false);
  };

  const deleteAllNotifications = async () => {
    try {
      for (const not of notification) {
        await deleteNotifications(not.ID);
      }

      setNotification(await getNotifications(parseInt(user.id)));
    } catch (error) {
      console.log(error);
    }
  };

  if (notification && user) {
    return (
      <div className="notification-container">
        <div className="notifications-header">
          <p>{notification.length} New notifications</p>

          <button
            className="btn-clean"
            onClick={() => {
              deleteAllNotifications();
            }}
          >
            Clean
          </button>
        </div>

        {notification.map((element, index) => {
          return (
            <div
              className="notification"
              key={index}
              onClick={() => selectImage(element.IdTrip)}
            >
              <img
                className="notification-img"
                src={`${import.meta.env.VITE_BACKEND_URL}/userImages/${
                  element.image
                }`}
              />
              <div
                className={
                  element.action === "like"
                    ? "notification-img-mini"
                    : "notification-img-mini2"
                }
              ></div>

              {element.action === "like" ? (
                <h4>
                  <span className="notification-span">{element.userName}</span>{" "}
                  dio like a tu publicacion "{element.title}"{" "}
                </h4>
              ) : (
                <h4>
                  <span className="notification-span">{element.userName}</span>{" "}
                  comento tu publicacion "{element.title}"{" "}
                </h4>
              )}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Notification;
