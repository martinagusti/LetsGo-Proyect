import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { allTripsAxios, getComments } from "../services";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./maps.css";

export default function Maps({
  trips,
  setIdTrip,
  setComments,
  setShowingPage,
  markerData,
  setMarkerData,
}) {
  const [ok, setOk] = useState(null);
  const [imagen, setImagen] = useState(``);
  const [city, setCity] = useState();
  const [title, setTitle] = useState();
  const [imgOn, setImgOn] = useState(false);
  const [likes, setLikes] = useState();
  const [selectedTrip, setSelectedTrip] = useState();
  const [userName, setUsername] = useState();

  const navigateTo = useNavigate();

  const selectImage = async () => {
    setIdTrip(selectedTrip);
    const comments = await getComments(selectedTrip.ID);
    setComments(comments);
    navigateTo(`/publication/${selectedTrip.ID}`);
  };

  setTimeout(() => {
    setOk("ok");
  }, 500);

  function click(trip) {
    setImagen(trip.image);
    setCity(trip.city);
    setTitle(trip.title);
    setImgOn(true);
    setLikes(trip.votes);
    setSelectedTrip(trip);
    setUsername(trip.userName);
    setMarkerData({ zoom: 6, lat: trip.latitude, lng: trip.longitude });
  }

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCspkmDMH0jv641KNVMGw92wQgrz02GBCc",
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="map-container2">
      <p className="maps-title">{trips.length} Trips</p>
      <GoogleMap
        zoom={parseInt(markerData.zoom)}
        center={{
          lat: parseFloat(markerData.lat),
          lng: parseFloat(markerData.lng),
        }}
        mapContainerClassName="map"
      >
        {ok &&
          trips.map((trip) => {
            return (
              <div key={trip.ID}>
                <Marker
                  position={{
                    lat: parseFloat(trip.latitude),
                    lng: parseFloat(trip.longitude),
                  }}
                  onClick={() => click(trip)}
                />
              </div>
            );
          })}
      </GoogleMap>
      {imgOn && (
        <div className="maps-trip-container">
          <img
            className="map-img"
            src={`${import.meta.env.VITE_BACKEND_URL}/tripImages/${imagen}`}
          />
          <div className="map-data-container">
            <h3>{city}</h3>
            <h4>{title}</h4>
            <button className="btn-visit" onClick={() => selectImage()}>
              <h4>Visit</h4>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
