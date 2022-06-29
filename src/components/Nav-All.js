import React from "react";

//This is temporary for testing

const NavAll = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
      <div className="navbar-collapse collapse">
        <ul className="navbar-nav mx-auto">
          <li className="nav-item px-3">
            <a className="nav-link" href="/">
              Welcome
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/dashboard">
              Home
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/settings">
              Settings
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/profile">
              Profile
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/campaign">
              Campaign
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/gym">
              Gym
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/exercise">
              Exercise
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/reset1">
              Reset1
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/reset2">
              Reset2
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/reset3">
              Reset3
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/score">
              Score
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/register">
              Register
            </a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="/login">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavAll;
