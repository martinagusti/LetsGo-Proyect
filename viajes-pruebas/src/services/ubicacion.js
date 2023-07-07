export const ubicacion = () => {
  const status = document.querySelector(".status");
  const coord = {};

  const sucess = async (position) => {
    (coord.lat = position.coords.latitude),
      (coord.lng = position.coords.longitude);

    localStorage.setItem("ubicacion", JSON.stringify(coord));
    return coord;
  };

  const error = () => {
    status.textContent = "Unable to retrieve your location";
  };

  navigator.geolocation.getCurrentPosition(sucess, error);
};
