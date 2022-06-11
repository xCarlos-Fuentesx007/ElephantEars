import React from 'react'
import Logo from '../img/Logo.PNG'

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="dashboard">
            <img src={Logo} width="30" height="30" class="d-inline-block align-top" alt="Logo" />
            Elephant Ears
        </a>
        <div class="navbar-collapse collapse justify-content-right">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item px-3">
                    <a class="nav-link" href="/dashboard">Home</a>
                </li>
                <li class="nav-item px-3">
                    <a class="nav-link" href="/settings">Settings</a>
                </li>
                <li class="nav-item px-3">
                    <a class="nav-link" href="/profile">Profile</a>
                </li>
                <li class="nav-item px-2">
                    <a class="btn btn-primary" href="/">Sign Out</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar;