import { useState } from "react";
import { useForm } from "react-hook-form";
import { signUp, uploadFile } from "../services";
import { useNavigate } from "react-router-dom";

import "./register.css";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [passwordError, setPasswordError] = useState(false);

  const [errorTextRegister, setErrorTextRegister] = useState();

  const [avatarUrl, setAvatarUrl] = useState();

  const navigateTo = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await signUp(
        data.name,
        data.lastname,
        data.username,
        data.email,
        data.password,
        data.confirmPassword,
        data.biography
      );
      console.log(response);

      if (response.status === 201) {
        navigateTo("/login");
      }
    } catch (error) {
      console.log(error);
      if (
        error.response.request.status === 409 ||
        error.response.request.status === 500
      ) {
        setErrorTextRegister(error.response.data.error);
      }
      if (data.password !== data.confirmPassword) {
        setErrorTextRegister("Las contraseñas deben coincidir");
      }
    }
  };

  return (
    <div className="register-form">
      <div className="caja">
        <div className="avatar-register"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="container-form">
          <div className="group-inputs">
            <input
              className="inputs-register"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: true,
              })}
            />

            {errors.name?.type === "required" && <span>Campo requerido</span>}

            <input
              className="inputs-register"
              type="text"
              placeholder="Surname"
              {...register("lastname", {
                required: true,
              })}
            />

            {errors.lastname?.type === "required" && (
              <span>Campo requerido</span>
            )}
          </div>

          <input
            className="inputs-register"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: true,
            })}
          />

          {errors.username?.type === "required" && <span>Campo requerido</span>}

          <input
            className="inputs-register"
            type="text"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.type === "required" && <span>Campo requerido</span>}
          {errors.email?.type === "pattern" && <span>Email no valido</span>}

          <div className="group-inputs">
            <input
              className="inputs-register"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
              })}
            />
            {errors.password?.type === "required" && (
              <span>Campo requerido</span>
            )}
            {errors.password?.type === "minLength" && (
              <span>Tu contraseña deberia tener al menos 6 digitos</span>
            )}

            <input
              className="inputs-register"
              type="password"
              placeholder="Confirm Password"
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
          </div>

          <textarea
            className="inputs-register"
            placeholder="Tell us something about you..."
            rows="4"
            cols="25"
            {...register("biography")}
            id="text-area"
          ></textarea>

          {errorTextRegister && <span>{errorTextRegister}</span>}
          <button type="submit" id="btn-register">
            Register
          </button>

          <p className="p-register">
            Do you already have an account?{" "}
            <span
              onClick={() => {
                navigateTo("/login");
              }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
