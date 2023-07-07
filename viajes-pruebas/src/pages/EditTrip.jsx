import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { uploadFile, favorites } from "../services/fileService";
import { allTripsAxios, allTripsParams } from "../services";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";

import "./editTrip.css";
import { object } from "joi";
import { createTrip, editTrip } from "../services/tripService";
import { useNavigate } from "react-router-dom";

export default function EditTrip({
  setShowingPage,
  setTrips,
  trips,
  datosToEdit,
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCspkmDMH0jv641KNVMGw92wQgrz02GBCc",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <Map
      setShowingPage={setShowingPage}
      setTrips={setTrips}
      trips={trips}
      datosToEdit={datosToEdit}
    />
  );
}

function Map({ setShowingPage, setTrips, trips, datosToEdit }) {
  const dateToEdit = new Date(datosToEdit.dateExperience);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  let dateEdited = formatDate(dateToEdit);

  const token = JSON.parse(localStorage.getItem("token"));

  const user = JSON.parse(localStorage.getItem("user"));

  const [latitud, setLatitud] = useState(datosToEdit.latitude);
  const [longitud, setLongitud] = useState(datosToEdit.longitude);
  const [ok, setOk] = useState(null);

  const [fileUrl, setFileUrl] = useState(
    `${import.meta.env.VITE_BACKEND_URL}/tripImages/${datosToEdit.image}`
  );

  const [errorText, setErrorText] = useState();

  const [city, setCity] = useState(datosToEdit.city);
  const [title, setTitle] = useState(datosToEdit.title);
  const [excerpt, setExcerpt] = useState(datosToEdit.excerpt);
  const [date, setDate] = useState(dateEdited);
  const [description, setDescription] = useState(datosToEdit.description);

  const navigateTo = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setOk("ok");
  }, [latitud]);

  function coordenadas() {
    setLatitud(this.getPosition().lat());
    setLongitud(this.getPosition().lng());
  }

  const handleOnChange = (e) => {
    const target = e.target.files[0];

    const url = URL.createObjectURL(target);
    setFileUrl(url);
  };

  const handleOnChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleOnChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleOnChangeExcerpt = (e) => {
    setExcerpt(e.target.value);
  };

  const handleOnChangeDate = (e) => {
    setDate(e.target.value);
  };

  const handleOnChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const { category, city, date, description, excerpt, title } = data;

    const dateTrip = new Date(date);

    const date1 = `${dateTrip.getFullYear()}-${
      dateTrip.getMonth() + 1
    }-${dateTrip.getDate()}`;

    const formData = new FormData(e.target);

    const formJson = Object.fromEntries(formData.entries());

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const params = JSON.parse(sessionStorage.getItem("params"));

      const result = await editTrip(
        datosToEdit.ID,
        data.title ? data.title : datosToEdit.title,
        data.date ? data.date : date1,
        data.category ? data.category : datosToEdit.category,
        data.city ? data.city : datosToEdit.city,
        data.excerpt ? data.excerpt : datosToEdit.excerpt,
        data.description ? data.description : datosToEdit.description,
        latitud,
        longitud
      );

      let image = datosToEdit.image;

      if (formJson.file.name !== "") {
        const imageData = await uploadFile(datosToEdit.ID, formData, config);
        image = imageData.data.imageName;
      }

      if (result) {
        setTrips(
          trips.map((element) => {
            if (element.ID == result.data.idTrip) {
              element.title = result.data.body.title;
              element.city = result.data.body.city;
              element.dateExperience = result.data.body.dateExperience;
              element.description = result.data.body.description;
              element.excerpt = result.data.body.excerpt;
              element.latitude = result.data.body.latitude;
              element.longitude = result.data.body.longitude;
              element.category = result.data.body.category;
              element.image = image;
            }

            return element;
          })
        );
      }
      navigateTo("/home");
      setShowingPage("search");
    } catch (error) {
      console.log(error);
      if (error.response.status === 403) {
        setErrorText("No tienes autorizacion para realizar esta accion...");
      } else {
        setErrorText(error.message);
      }
    }
  };

  return (
    <div className="new-container">
      <form
        className="form-container"
        method="post"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="img-container">
          <img src={fileUrl} alt="" height="110" />
          {!fileUrl && <div className="imagenTrip"></div>}
        </div>

        <input
          type="file"
          name="file"
          onChange={handleOnChange}
          className="input-img"
        />
        <input
          type="text"
          id="city"
          defaultValue={city}
          onChange={handleOnChangeCity}
          {...register("city", {})}
        />
        {errors.city?.type === "required" && <span>Campo requerido</span>}

        <input
          type="text"
          id="title"
          defaultValue={title}
          onChange={handleOnChangeTitle}
          {...register("title", {})}
        />
        {errors.title?.type === "required" && <span>Campo requerido</span>}
        <select
          name="category"
          id="lang"
          onChange={handleOnChange}
          {...register("category", {})}
        >
          <option
            selected={datosToEdit.category === "viaje-cultural" ? true : false}
            value="viaje-cultural"
          >
            Cultural
          </option>
          <option
            selected={datosToEdit.category === "viaje-diversion" ? true : false}
            value="viaje-diversion"
          >
            Diversion
          </option>
          <option
            selected={datosToEdit.category === "viaje-familiar" ? true : false}
            value="viaje-familiar"
          >
            Familiar
          </option>
          <option
            selected={
              datosToEdit.category === "viaje-gastronomico" ? true : false
            }
            value="viaje-gastronomico"
          >
            Gastronomico
          </option>
          <option
            selected={
              datosToEdit.category === "viaje-naturaleza" ? true : false
            }
            value="viaje-naturaleza"
          >
            Naturaleza
          </option>
          <option
            selected={datosToEdit.category === "viaje-negocios" ? true : false}
            value="viaje-negocios"
          >
            Negocios
          </option>
          <option
            selected={datosToEdit.category === "viaje-playero" ? true : false}
            value="viaje-playero"
          >
            Playero
          </option>
          <option
            selected={datosToEdit.category === "viaje-rural" ? true : false}
            value="viaje-rural"
          >
            Rural
          </option>
          <option
            selected={datosToEdit.category === "viaje-low-cost" ? true : false}
            value="viaje-low-cost"
          >
            Low-Cost
          </option>
        </select>
        {errors.category?.type === "required" && <span>Campo requerido</span>}

        <input
          type="text"
          id="excerpt"
          defaultValue={excerpt}
          onChange={handleOnChangeExcerpt}
          {...register("excerpt", {})}
        />
        {errors.excerpt?.type === "required" && <span>Campo requerido</span>}
        <input
          type="date"
          id="date"
          defaultValue={date}
          onChange={handleOnChangeDate}
          {...register("date", {})}
        />
        {errors.date?.type === "required" && <span>Campo requerido</span>}
        <textarea
          type="text"
          id="descripcion"
          defaultValue={description}
          onChange={handleOnChangeDescription}
          {...register("description", {
            maxLength: 500,
          })}
        />
        <input type="text" id="lat" value={latitud} readOnly hidden />
        <input type="text" id="lng" value={longitud} readOnly hidden />

        <label>Arrastre la posicion en el mapa</label>
        <GoogleMap
          zoom={5}
          center={{
            lat: parseFloat(datosToEdit.latitude),
            lng: parseFloat(datosToEdit.longitude),
          }}
          mapContainerClassName="map-container"
        >
          {ok && (
            <Marker
              draggable
              position={{ lat: parseFloat(latitud), lng: parseFloat(longitud) }}
              onDragEnd={coordenadas}
            />
          )}
        </GoogleMap>
        {errorText && <p className="errorText">{errorText}</p>}
        <button type="submit">Save changes</button>
      </form>
    </div>
  );
}
