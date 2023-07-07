import { useContext, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import Header from "./components/headers/Header.jsx";
import Trips from "./components/trips/Trips.jsx";
import Footer from "./components/footer/Footer.jsx";
import Initial from "./pages/Initial.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Maps from "./pages/Maps.jsx";
import Publication from "./pages/Publication.jsx";
import Favourites from "./pages/Favourites.jsx";
import EditUser from "./pages/EditUser.jsx";
import EditTrip from "./pages/EditTrip.jsx";
import Notifications from "./components/notifications/Notifications.jsx";
import { useSearchParams } from "react-router-dom";

import {
  allTripsParams,
  createNotifications,
  deleteTripService,
  favourites,
  likeTrip,
  setFavourites,
  tripsByUserName,
} from "./services/index.js";

import "./app.css";

import useTrips from "./hooks/useTrips.js";
import CreateTrips from "./pages/CreateNewTrips.jsx";
import CreateNewTrips from "./pages/CreateNewTrips.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { useNavigate } from "react-router-dom";
import { ubicacion } from "./services/ubicacion.js";
import { getTripById } from "./services/tripService.js";
import useTrip from "./hooks/useTrip.js";

const coord = ubicacion();

import useNotification from "./hooks/useNotification.js";

let params = JSON.parse(sessionStorage.getItem("params")) || "";

let viajes = await allTripsParams(params);

let getUserNameTrips = [];
let user = JSON.parse(localStorage.getItem("user"));

if (user) {
  getUserNameTrips = await tripsByUserName(user?.userName);
}

let favouritesTrips = [];
if (user) {
  favouritesTrips = await favourites();
}

function App() {
  let width = document.getElementById("width")?.clientWidth;

  user = JSON.parse(localStorage.getItem("user"));
  const ubicacion = JSON.parse(localStorage.getItem("ubicacion"));

  const { trips, setTrips, filters, setFilters, offset, setOffset } =
    useTrips();

  const { notification, loading, error, setNotification } = useNotification();

  const [parametros, setParametros] = useSearchParams();
  const [seeNotifications, setSeeNotifications] = useState(false);
  const [distance, setDistance] = useState(24000);
  const [city, setCity] = useState("");
  const [category, setCategory] = useState();
  const [showingPage, setShowingPage] = useState("initial");
  const [order, setOrder] = useState("fechapublicacion");
  const [idTrip, setIdTrip] = useState();
  const [comments, setComments] = useState();
  const [selectProfile, setSelectProfile] = useState();
  const [userNameTrips, setUserNameTrips] = useState(getUserNameTrips);
  const [favsTrips, setFavsTrips] = useState(user ? favouritesTrips : []);
  const [datosToEdit, setDatosToEdit] = useState();
  const [markerData, setMarkerData] = useState({
    zoom: 4,
    lat: ubicacion.lat,
    lng: ubicacion.lng,
  });

  const navigateTo = useNavigate();

  useEffect(() => {
    const cleanFilters = async () => {
      try {
        setCity("");
        setCategory("");
        setOrder("fechapublicacion");
        setDistance(24000);
      } catch (error) {
        setError(error.message);
      }
    };
    cleanFilters();
  }, [showingPage === "new"]);

  const deleteTrip = async (id) => {
    await deleteTripService(id);
    setUserNameTrips(userNameTrips.filter((element) => element.ID !== id));
    setTrips(trips.filter((element) => element.ID !== id));
    navigateTo("/profile");
    setShowingPage("profile");
  };

  const liked = async (id) => {
    const res = await likeTrip(id);

    const action = "like";

    setTrips(
      trips.map((element) => {
        if (element.ID === id) {
          element.like === true
            ? (element.votes = element.votes - 1)
            : (element.votes = element.votes + 1);
          element.like = !element.like;
        }

        return element;
      })
    );
    if (res.data.voteId) {
      await createNotifications(id, action);
    }
  };

  const setInFavourites = async (dato) => {
    const a = await setFavourites(dato.ID);

    if (a.data === false) {
      setTrips(
        trips.map((element) => {
          element.ID === dato.ID ? (element.favourite = false) : element;
          return element;
        })
      );

      setFavsTrips(
        favsTrips.filter((element) => {
          return element.ID !== dato.ID;
        })
      );
    } else {
      setTrips(
        trips.map((element) => {
          element.ID === dato.ID ? (element.favourite = true) : element;
          return element;
        })
      );
      setFavsTrips([dato, ...favsTrips]);
    }
  };

  const handleOnChange = (e) => {
    setDistance(Number(e.target.value));
  };

  const handleOnChangeOrder = (e) => {
    setOrder(e.target.value);
  };

  const changeCity = (e) => {
    setDistance(Number(24000));
    setCity(e.target.value.toUpperCase());
    setCategory("");
    if (e.target.value === "") {
      parametros.delete("city");
      if (category) {
        parametros.set("category", category);
      }
    }
    if (e.target.value !== "") {
      parametros.delete("category");
      parametros.delete("limit");
      parametros.delete("offset");
      parametros.set("city", e.target.value);
    }

    parametros.set("limit", 100);
    parametros.set("offset", 0);
    setFilters("");
    setParametros(parametros);
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
    setCity("");

    if (city) {
      parametros.delete("city");
    }

    if (e.target.value === "") {
      parametros.delete("category");
      parametros.delete("limit");
      parametros.delete("offset");
      setFilters(null);
      setParametros(parametros);
      console.log(parametros.toString());
    }
    if (e.target.value !== "") {
      parametros.set("category", e.target.value);
      parametros.set("limit", 100);
      parametros.set("offset", 0);
      setFilters(parametros.toString());
      setParametros(parametros);
    }

    setOffset(0);
  };

  const ok = async () => {
    console.log("Sacar este boton!!!");
  };

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setOffset(offset + 10);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <div className="app-container" id="width">
      {/*   {showingPage !== "login" &&
        showingPage !== "register" &&
        showingPage !== "maps" &&
        showingPage !== "editUser" &&
        showingPage !== "editTrip" &&
        showingPage !== "publication" &&
        showingPage !== "profile" &&
        showingPage !== "favourites" &&
        showingPage !== "newtrip" && ( */}
      <Header
        favourites={favourites}
        ok={ok}
        handleOnChange={handleOnChange}
        handleOnChangeCity={changeCity}
        handleOnChangeCategory={changeCategory}
        city={city}
        category={category}
        distance={distance}
        order={order}
        setShowingPage={setShowingPage}
        showingPage={showingPage}
        handleOnChangeOrder={handleOnChangeOrder}
        setTrips={setTrips}
        setSeeNotifications={setSeeNotifications}
        seeNotifications={seeNotifications}
        notification={notification}
      />
      {/* )} */}
      <Routes>
        <Route
          path="/"
          element={
            <Initial
              setShowingPage={setShowingPage}
              showingPage={showingPage}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Trips
              datos={trips}
              setTrips={setTrips}
              showingPage={showingPage}
              setShowingPage={setShowingPage}
              setIdTrip={setIdTrip}
              setComments={setComments}
              setSelectProfile={setSelectProfile}
              setUserNameTrips={setUserNameTrips}
              trips2={viajes}
              order={order}
              distance={distance}
              category={category}
              city={city}
              liked={liked}
              setInFavourites={setInFavourites}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login setShowingPage={setShowingPage} setTrips={setTrips} />
          }
        />

        <Route
          path="/register"
          element={<Register setShowingPage={setShowingPage} />}
        />

        <Route
          path="/profile"
          element={
            <Profile
              setShowingPage={setShowingPage}
              selectProfile={selectProfile}
              setSelectProfile={setSelectProfile}
              setIdTrip={setIdTrip}
              setComments={setComments}
              userNameTrips={userNameTrips}
            />
          }
        />

        <Route
          path="/publication/:id"
          element={
            <Publication
              setShowingPage={setShowingPage}
              datos={idTrip}
              setIdTrip={setIdTrip}
              comments={comments}
              setComments={setComments}
              setTrips={setTrips}
              userNameTrips={userNameTrips}
              setUserNameTrips={setUserNameTrips}
              deleteTrip={deleteTrip}
              setDatosToEdit={setDatosToEdit}
              setMarkerData={setMarkerData}
              liked={liked}
            />
          }
        />

        <Route
          path="/favourites"
          element={
            <Favourites
              setShowingPage={setShowingPage}
              selectProfile={selectProfile}
              setSelectProfile={setSelectProfile}
              setIdTrip={setIdTrip}
              setComments={setComments}
              userNameTrips={userNameTrips}
              setUserNameTrips={setUserNameTrips}
              setInFavourites={setInFavourites}
            />
          }
        />

        <Route
          path="/maps"
          element={
            <Maps
              showingPage={showingPage}
              trips={trips}
              setShowingPage={setShowingPage}
              setIdTrip={setIdTrip}
              setComments={setComments}
              markerData={markerData}
              setMarkerData={setMarkerData}
            />
          }
        />

        <Route
          path="/newtrip"
          element={
            <CreateNewTrips
              setShowingPage={setShowingPage}
              setTrips={setTrips}
              trips={trips}
              markerData={markerData}
            />
          }
        />

        <Route
          path="/edituser"
          element={
            <EditUser
              setShowingPage={setShowingPage}
              setTrips={setTrips}
              trips={trips}
            />
          }
        />
        <Route
          path="/edittrip"
          element={
            <EditTrip
              setShowingPage={setShowingPage}
              setTrips={setTrips}
              trips={trips}
              datosToEdit={datosToEdit}
            />
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {showingPage !== "initial" &&
        showingPage !== "login" &&
        showingPage !== "register" && (
          <Footer
            setSelectProfile={setSelectProfile}
            setUserNameTrips={setUserNameTrips}
            setShowingPage={setShowingPage}
            setSeeNotifications={setSeeNotifications}
            seeNotifications={seeNotifications}
            notification={notification}
            showingPage={showingPage}
          />
        )}
      {seeNotifications === true && (
        <Notifications
          notification={notification}
          setNotification={setNotification}
          setComments={setComments}
          setShowingPage={setShowingPage}
          setSeeNotifications={setSeeNotifications}
        />
      )}
    </div>
  );
}

export default App;
