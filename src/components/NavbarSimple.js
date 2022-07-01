import React from "react";
import { Link } from "react-router-dom";

import Logo from "../img/Logo.PNG";

const NavbarSimple = () => {
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
    </nav>
  );
};

export default NavbarSimple;
