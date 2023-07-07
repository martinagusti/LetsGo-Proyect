import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthproviderComponent = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
