import { useState, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { uploadFile, favorites } from "../services/fileService";
import { allTripsAxios, allTripsParams } from "../services";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import "./createNewTrips.css";
import { object } from "joi";
import { createTrip } from "../services/tripService";

export default function CreateNewTrips({ setTrips, trips, markerData }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCspkmDMH0jv641KNVMGw92wQgrz02GBCc",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <CreateNewTrip setTrips={setTrips} trips={trips} markerData={markerData} />
  );
}

function CreateNewTrip({ setTrips, trips, markerData }) {
  const token = JSON.parse(localStorage.getItem("token"));

  const user = JSON.parse(localStorage.getItem("user"));

  const navigateTo = useNavigate();

  const [latitud, setLatitud] = useState(41.3879);
  const [longitud, setLongitud] = useState(2.16992);
  const [ok, setOk] = useState(null);

  const [fileUrl, setFileUrl] = useState();

  const [errorText, setErrorText] = useState();

  const [city, setCity] = useState();
  const [title, setTitle] = useState();
  const [excerpt, setExcerpt] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();

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
    console.log(date1);

    const formData = new FormData(e.target);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      const params = JSON.parse(sessionStorage.getItem("params"));

      if (formJson.file.name === "") {
        setErrorText("Debes seleccionar una imagen");
        return;
      }

      const result = await createTrip(
        title,
        date1,
        category,
        city,
        excerpt,
        description,
        latitud,
        longitud
      );

      const image = await uploadFile(result.data[0], formData, config);

      const newTrip = {
        ID: result.data[0],
        IdUser: result.data[1].id,
        title: result.data[1].title,
        createAt: result.data[1].now,
        dateExperience: result.data[1].dateExperience,
        category: result.data[1].category,
        city: result.data[1].city,
        excerpt: result.data[1].excerpt,
        description: result.data[1].description,
        image: image.data.imageName,
        latitude: result.data[1].latitude,
        longitude: result.data[1].longitude,
      };

      setTrips([newTrip, ...trips]);

      navigateTo("/home");
    } catch (error) {
      console.log(error);
      setErrorText(error.response.data.error);
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
          value={city}
          placeholder="city"
          onChange={handleOnChangeCity}
          {...register("city", {
            required: true,
          })}
        />
        {errors.city?.type === "required" && <span>Campo requerido</span>}

        <input
          type="text"
          id="title"
          value={title}
          placeholder="title"
          onChange={handleOnChangeTitle}
          {...register("title", {
            required: true,
          })}
        />
        {errors.title?.type === "required" && <span>Campo requerido</span>}
        <select
          name="category"
          id="lang"
          onChange={handleOnChange}
          {...register("category", {
            required: true,
          })}
        >
          <option value="viaje-cultural">Cultural</option>
          <option value="viaje-diversion">Diversion</option>
          <option value="viaje-familiar">Familiar</option>
          <option value="viaje-gastronomico">Gastronomico</option>
          <option value="viaje-naturaleza">Naturaleza</option>
          <option value="viaje-negocios">Negocios</option>
          <option value="viaje-playero">Playero</option>
          <option value="viaje-rural">Rural</option>
          <option value="viaje-low-cost">Low-Cost</option>
        </select>
        {errors.category?.type === "required" && <span>Campo requerido</span>}

        <input
          type="text"
          id="excerpt"
          value={excerpt}
          placeholder="Intro"
          onChange={handleOnChangeExcerpt}
          {...register("excerpt", {
            required: true,
          })}
        />
        {errors.excerpt?.type === "required" && <span>Campo requerido</span>}
        <input
          type="date"
          id="date"
          value={date}
          placeholder="dateExperience"
          onChange={handleOnChangeDate}
          {...register("date", {
            required: true,
          })}
        />
        {errors.date?.type === "required" && <span>Campo requerido</span>}
        <textarea
          type="text"
          id="descripcion"
          value={description}
          placeholder="description"
          onChange={handleOnChangeDescription}
          {...register("description", {
            maxLength: 500,
          })}
        />
        <input type="text" id="lat" value={latitud} readOnly hidden />
        <input type="text" id="lng" value={longitud} readOnly hidden />

        <label>Arrastre la posicion en el mapa</label>
        <GoogleMap
          zoom={4}
          center={{
            lat: latitud,
            lng: longitud,
          }}
          mapContainerClassName="map-container"
        >
          {ok && (
            <Marker
              draggable
              position={{
                lat: latitud,
                lng: longitud,
              }}
              onDragEnd={coordenadas}
            />
          )}
        </GoogleMap>
        {errorText && <span>{errorText}</span>}
        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
}
