import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import AuthContextProvider from "./context/auth-context";

ReactDOM.render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>,
  document.getElementById("root")
);
