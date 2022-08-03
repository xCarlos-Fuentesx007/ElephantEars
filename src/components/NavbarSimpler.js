import React from "react";

import Logo from "../img/Logo.PNG";

const NavbarSimpler = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light mx-4">
        <img
          src={Logo}
          width="40"
          height="40"
          className="d-inline-block align-top mx-2"
          alt="Logo"
        />
        Elephant Ears
    </nav>
  );
};

export default NavbarSimpler;
