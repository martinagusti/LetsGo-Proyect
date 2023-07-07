import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { editProfile } from "../services";

import { uploadAvatarFile } from "../services/fileService";
import { useNavigate } from "react-router-dom";
import "./editUser.css";

function EditUser({ setShowingPage, setTrips, trips }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordError, setPasswordError] = useState(false);

  const [errorTextRegister, setErrorTextRegister] = useState();

  const [fileUrl, setFileUrl] = useState(
    `${import.meta.env.VITE_BACKEND_URL}/userImages/${
      user.image ? user.image : "avatar-generico.png"
    }`
  );

  const { setToken, setUser } = useContext(AuthContext);

  const handleOnChange = (e) => {
    const target = e.target.files[0];

    const url = URL.createObjectURL(target);
    setFileUrl(url);
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson.file);

    const config = {
      header: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      setPasswordError(false);
      if (data.password !== data.confirmPassword) {
        setPasswordError(true);
        return;
      }

      let image = user.image ? user.image : "avatar-generico.png";
      if (formJson.file.name !== "") {
        image = await uploadAvatarFile(formData, config);
      }

      console.log(image);

      await editProfile(
        data.name ? data.name : user.name,
        data.lastname ? data.lastname : user.lastName,
        data.username ? data.username : user.userName,
        data.password,
        data.confirmPassword,
        data.biography ? data.biography : user.bio
      );
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);

      setTrips(
        trips.map((element) => {
          element.userName === user.userName
            ? (element.userImage = image.data)
            : element.userName;
          return element;
        })
      );
      navigateTo("/login");
      setShowingPage("login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-form">
      <div className="caja">
        <div className="img-container">
          <img src={fileUrl} alt="" height="110" className="img-avatar" />
          {!fileUrl && <div className="imagenTrip"></div>}
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container-form-useredit"
        >
          <input
            type="file"
            name="file"
            onChange={handleOnChange}
            className="input-img-useredit"
          />

          <label>Name</label>
          <input
            className="inputs-edituser"
            type="text"
            defaultValue={user.name}
            {...register("name", {})}
          />

          {errors.name?.type === "required" && <span>Campo requerido</span>}
          <label>Lastname</label>
          <input
            className="inputs-edituser"
            type="text"
            defaultValue={user.lastName}
            {...register("lastname", {})}
          />

          {errors.lastname?.type === "required" && <span>Campo requerido</span>}

          <label>UserName</label>
          <input
            className="inputs-edituser"
            type="text"
            readOnly
            defaultValue={user.userName}
            {...register("username", {})}
          />

          {errors.username?.type === "required" && <span>Campo requerido</span>}

          <label>Biography</label>
          <textarea
            className="inputs-edituser"
            rows="4"
            cols="25"
            defaultValue={user.bio}
            {...register("biography")}
            id="text-area"
          ></textarea>

          {errorTextRegister && <span>{errorTextRegister}</span>}

          <label>Password</label>

          <input
            className="inputs-edituser"
            type="password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password?.type === "required" && <span>Campo requerido</span>}
          {errors.password?.type === "minLength" && (
            <span>Tu contraseña deberia tener al menos 6 digitos</span>
          )}

          <label>Confirm Password</label>

          <input
            className="inputs-edituser"
            type="password"
            {...register("confirmPassword", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.confirmPassword?.type === "required" && (
            <span>Campo requerido</span>
          )}
          {errors.confirmPasswordsword?.type === "minLength" && (
            <span>Tu contraseña deberia tener al menos 6 digitos</span>
          )}
          {passwordError && <span>La contraseña no coincide</span>}

          <button type="submit" id="btn-register">
            Update Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
