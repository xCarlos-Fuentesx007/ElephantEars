import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth-context";

import Logo from "../img/Logo.PNG";

const NavWel = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light mx-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={Logo}
            width="40"
            height="40"
            className="d-inline-block align-top mx-2"
            alt=""
          />
          Elephant Ears
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMobile"
          aria-controls="navbarMobile"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse collapse justify-content-right"
          id="navbarMobile"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item px-lg-3">
              <p className="navbar-text mb-0">Welcome!</p>
            </li>
            {!isLoggedIn && (
              <>
                <li className="nav-item px-lg-3 my-2 my-lg-0">
                  <Link className="btn btn-outline-primary" to="/register">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
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
      </div>
    </nav>
  );
};

export default NavWel;
