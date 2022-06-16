import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//Pages
import Dashboard from "./pages/Dashboard.js";
import Profile from "./pages/Profile.js";
import Settings from "./pages/Settings.js";
import Welcome from "./pages/Welcome.js";
import Reset1 from "./pages/Reset1.js";
import Reset2 from "./pages/Reset2.js";
import Reset3 from "./pages/Reset3.js";
import Campaign from "./pages/Campaign";
import Gym from "./pages/Gym.js";
import Score from "./pages/Score.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register";
import Exercise from "./pages/Exercise";

//Components
import NavAll from "./components/Nav-All";

const App = () => (
  <Fragment>
    <Router>
      <NavAll />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="reset1" element={<Reset1 />} />
        <Route path="reset2" element={<Reset2 />} />
        <Route path="reset3" element={<Reset3 />} />
        <Route path="campaign" element={<Campaign />} />
        <Route path="gym" element={<Gym />} />
        <Route path="score" element={<Score />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="exercise" element={<Exercise />} />
      </Routes>
    </Router>
  </Fragment>
);

export default App;
