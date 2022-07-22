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
    <nav className="navbar navbar-expand-lg navbar-light mx-4">
      <Link className="navbar-brand" to="/">
        <img
          src={Logo}
          width="40"
          height="40"
          className="d-inline-block align-top mx-2"
          alt="Logo"
        />
        Elephant Ears
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navMobile"
        aria-controls="navMobile"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="navbar-collapse collapse justify-content-right"
        id="navMobile"
      >
        <ul className="navbar-nav ms-auto">
          <li className="nav-item px-3">
            <Link className="nav-link" to="/dashboard">
              Home
            </Link>
          </li>
          <li className="nav-item px-3">
            <Link className="nav-link" to="/campaign">
              Campaign
            </Link>
          </li>
          <li className="nav-item px-3">
            <Link className="nav-link" to="/gym">
              Gym
            </Link>
          </li>
          <li className="nav-item px-3">
            <Link className="nav-link" to="/settings">
              Settings
            </Link>
          </li>
          {/* <li className="nav-item px-3">
            <Link className="nav-link" to="/profile">
              Account
            </Link>
          </li> */}
          {isLoggedIn && (
            <li className="nav-item px-2">
              <Link
                className="btn btn-primary"
                to="/login"
                onClick={logoutHandler}
              >
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
