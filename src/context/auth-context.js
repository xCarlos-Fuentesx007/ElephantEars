import React, { useEffect, useState } from "react";

const url = process.env.REACT_APP_BACKEND_USERS_URL;

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: null,
  isLoading: false,
  error: undefined,
  login: (userData) => {},
  signup: (userData) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiresIn) > new Date()
    ) {
      setToken(storedData.token);
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem("userData");
    }
  }, []);

  const login = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
    setIsLoggedIn(true);
    setToken(responseData.token);
    const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({ token: responseData.token, expiresIn: expirationDate })
    );
  };

  const signup = async (userData) => {
    setIsLoading(true);
    setError(undefined);
    const response = await fetch(`${url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const responseData = await response.json();
    setIsLoading(false);
    if (responseData.message) {
      setError(responseData.message);
      return;
    }
    setIsLoggedIn(true);
    setToken(responseData.token);
    const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    localStorage.setItem(
      "userData",
      JSON.stringify({ token: responseData.token, expiresIn: expirationDate })
    );
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(undefined);
    localStorage.removeItem("userData");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        token: token,
        login: login,
        signup: signup,
        logout: logout,
        error: error,
        isLoading: isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
