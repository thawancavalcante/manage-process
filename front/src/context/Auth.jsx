import React, { createContext, useState, useEffect, useContext } from "react";

import api from "../services/api";
import { parseJwt } from "../utils/jwt";

const AuthContextData = {
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext(AuthContextData);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(AuthContextData.user);
  const [loading, setLoading] = useState(AuthContextData.loading);

  useEffect(() => {
    const loadStorageData = async () => {
      const storagedToken = localStorage.getItem("@Auth:token");
      if (storagedToken) {
        const decoded = parseJwt(storagedToken);
        if (!decoded) {
          logout();
        }
        setUser(decoded);
        api.defaults.headers.Authorization = `Baerer ${storagedToken}`;
      }

      setLoading(false);
    };

    loadStorageData();
  }, []);

  const login = async (loginData) => {
    setLoading(true);

    return api
      .post("/auth", loginData)
      .then(({ data }) => {
        localStorage.setItem("@Auth:token", data.token);
        location = "/";
        return;
      })
      .catch(({ response: { data } }) => {
        return data;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    localStorage.removeItem("@Auth:token");
    setUser(null);
    location = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
};

export { AuthProvider, useAuth };
