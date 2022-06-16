import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import Logo from "../img/Logo.PNG";

const Navbar = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light mx-4">
      <Link class="navbar-brand" to="/dashboard">
        <img
          src={Logo}
          width="40"
          height="40"
          class="d-inline-block align-top mx-2"
          alt="Logo"
        />
        Elephant Ears
      </Link>
      <div class="navbar-collapse collapse justify-content-right">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item px-3">
            <Link class="nav-link" to="/dashboard">
              Home
            </Link>
          </li>
          <li class="nav-item px-3">
            <Link class="nav-link" to="/settings">
              Settings
            </Link>
          </li>
          <li class="nav-item px-3">
            <Link class="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          {isLoggedIn && (
            <li class="nav-item px-2">
              <Link class="btn btn-primary" to="/login" onClick={logoutHandler}>
                Sign Out
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
