import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import { login } from "../services/";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import "./login.css";

function Login({ setShowingPage }) {
  const [errorText, setErrorText] = useState();
  const [pass, setPass] = useState(false);

  const { setToken, setUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigateTo = useNavigate();

  const viewPass = () => {
    setPass(!pass);
  };

  const onSubmit = async (dataUser) => {
    try {
      const response = await login(dataUser.email, dataUser.password);

      if (response.data[0].accesToken) {
        setUser(response.data[1]);
        setToken(response.data[0].accesToken);
        setShowingPage("search");
        navigateTo("/home");

        setErrorText(null);
      }
    } catch (error) {
      console.log(error);
      if (error.response.request.status === 403) {
        setErrorText("Usuario o contraseña incorrecto");
      }

      if (error.response.request.status === 401) {
        setErrorText("Debe validar su cuenta con el mail recibido");
      }
    }
    setPass(false);
  };

  return (
    <div className="login-form">
      <div className="box-login">
        <div className="avatar"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="loginContainer-form">
          <div className="div-username">
            <div>
              <div className="username-img"></div>
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
            </div>

            {errors.email?.type === "required" && <span>Campo requerido</span>}
            {errors.email?.type === "pattern" && (
              <span>Email no es valido</span>
            )}
          </div>

          <div className="div-password">
            <div>
              <div className="password-img"></div>

              <input
                type={pass ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                })}
              />
            </div>

            {errors.password?.type === "required" && (
              <span>Campo requerido</span>
            )}
            {errors.password?.type === "minLength" && (
              <span>Tu contraseña deberia tener 6 o mas digitos</span>
            )}
            <div className="view-password" onClick={() => viewPass()}></div>
          </div>
          {errorText && <span>{errorText}</span>}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
