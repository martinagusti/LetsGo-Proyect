import { useEffect, useState } from "react";
import { useRef } from "react";
import {
  deleteTripService,
  getTripById,
  tripsById,
} from "../services/tripService";
import { createComment, createNotifications, getComments } from "../services";
import { useNavigate, useParams } from "react-router-dom";

import "./publication.css";
import useTrip from "../hooks/useTrip";

function Publication({
  datos,
  comments,
  setComments,
  setTrips,
  userNameTrips,
  setUserNameTrips,
  deleteTrip,
  setDatosToEdit,
  setMarkerData,
  setIdParam,
  liked,
  setIdTrip,
}) {
  const user = JSON.parse(localStorage.getItem("user"));

  const targetRef = useRef(null);

  const [commentarie, setCommentarie] = useState();
  const [seeComments, setSeeComments] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const navigateTo = useNavigate();

  const { id } = useParams();

  const { trip, loading, error, comentarios, setComentarios } = useTrip(id);

  const like = (id) => {
    if (user) {
      liked(id);
      if (datos.like === true) {
        setIdTrip((datos.votes = datos.votes - 1));
      } else {
        setIdTrip((datos.votes = datos.votes + 1));
      }
      setIdTrip((datos.like = !datos.like));
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!trip) {
    return <p>Se produjo un error al cargar los datos...</p>;
  }

  datos = trip;

  const comentar = async () => {
    const newComentarie = await createComment(datos.ID, commentarie);

    setComentarios(await getComments(datos.ID));

    targetRef.current?.scrollIntoView({
      bottom: 0,
      behavior: "smooth",
    });

    setCommentarie("");
    const data = await createNotifications(datos.ID, "comment");
  };

  const viewComments = () => {
    setSeeComments(!seeComments);
    if (!user) {
      setCommentarie("You must be registered to comment");
    }
  };

  const onchangeCommentarie = (e) => {
    setCommentarie(e.target.value);
  };

  const editTrip = () => {
    setDatosToEdit(datos);
    navigateTo("/edittrip");
  };

  const viewInMap = (datos) => {
    navigateTo("/maps");
    setMarkerData({
      zoom: 4,
      lat: datos.latitude,
      lng: datos.longitude,
    });

    setTimeout(() => {
      setMarkerData({
        zoom: 6,
        lat: datos.latitude,
        lng: datos.longitude,
      });
    }, 500);

    setTimeout(() => {
      setMarkerData({
        zoom: 8,
        lat: datos.latitude,
        lng: datos.longitude,
      });
    }, 1000);

    setTimeout(() => {
      setMarkerData({
        zoom: 10,
        lat: datos.latitude,
        lng: datos.longitude,
      });
    }, 1500);

    setTimeout(() => {
      setMarkerData({
        zoom: 12,
        lat: datos.latitude,
        lng: datos.longitude,
      });
    }, 2000);
  };

  return (
    <div className="selectedTrip-container">
      <div className="creator">
        <img
          className="creator-img"
          src={`${import.meta.env.VITE_BACKEND_URL}/userImages/${
            datos.userImage
          }`}
        />
        <h3 className="creator-userName">{datos.username}</h3>
      </div>
      <div className="img-btn-container">
        <img
          className="img-publication"
          src={`${import.meta.env.VITE_BACKEND_URL}/tripImages/${datos.image}`}
        />
        <div className="publication-topBox">
          <h2>{datos.city}</h2>
        </div>
        {datos.IdUser === user?.id && user && (
          <button
            className="btn-options"
            onClick={() => {
              setModal(true);
            }}
          ></button>
        )}

        <div className="publication-actions-container">
          <div className="actions">
            <div
              className="publication-likes-container"
              onClick={() => like(datos.ID)}
            >
              <div
                className={
                  datos.like === true
                    ? "publication-likes-fill"
                    : "publication-likes"
                }
              ></div>
              <p>{datos.votes}</p>
            </div>
            <div
              className="comments-icono-container"
              onClick={() => {
                viewComments();
              }}
            >
              <div className="icon-num">
                <div className="comments-icon"></div>
                <p>{comentarios.length}</p>
              </div>
            </div>
            <div className="map-distance" onClick={() => viewInMap(datos)}>
              <div className="view-in-map"></div>
              <h4 className="lbl-map">Map</h4>
            </div>
            <p>{`${datos.distance} Km`}</p>
          </div>

          <hr className="hr"></hr>
          <h3 className="trip-title">{datos.excerpt.toUpperCase()}</h3>
          <hr className="hr"></hr>
          <h3 className="trip-description">{datos.description}</h3>
        </div>
      </div>

      {seeComments && (
        <div className="comentaries-gral">
          {comentarios.map((coment, index) => {
            return (
              <div
                ref={targetRef}
                key={index}
                className="comentaries-container"
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/userImages/${
                    coment.image
                  }`}
                />
                <div className="user-data">
                  <h3 className="coment-username">{coment.username}</h3>
                  <h3 className="font-comentaries">{coment.comentaries}</h3>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {seeComments && (
        <div className="inputComent-container">
          <input
            type="text"
            id="comment"
            className="input-comment"
            value={commentarie}
            onChange={onchangeCommentarie}
          />
          {user && (
            <button
              onClick={() => {
                comentar();
              }}
            >
              Send
            </button>
          )}
        </div>
      )}
      <div className="scroll" ref={targetRef}></div>
      {modal === true && (
        <div className="modal-container">
          <div className="modal">
            <h2 className="delete-text">{datos.city}</h2>
            <button className="btn-edit" onClick={() => editTrip()}>
              Edit trip
            </button>
            <button className="btn-delete" onClick={() => setModalDelete(true)}>
              Delete trip
            </button>
            <button className="btn-cancel" onClick={() => setModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {modalDelete === true && (
        <div className="modal-container">
          <div className="modal-delete">
            <h2 className="delete-text">Confirm</h2>

            <button className="btn-delete" onClick={() => deleteTrip(datos.ID)}>
              Delete trip
            </button>
            <button
              className="btn-cancel"
              onClick={() => {
                setModalDelete(false);
                setModal(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Publication;
