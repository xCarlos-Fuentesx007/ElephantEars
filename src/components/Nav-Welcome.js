import React from 'react'
import Logo from '../img/Logo.PNG'

const NavWel = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="dashboard">
            <img src={Logo} width="30" height="30" class="d-inline-block align-top" alt="" />
            Elephant Ears
        </a>
        <div class="navbar-collapse collapse justify-content-right">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item px-3">
                    <p class="navbar-text">Welcome!</p>
                </li>
                <li class="nav-item px-3">
                    <a class="btn btn-outline-primary" href="/register">Register</a>
                </li>
                <li class="nav-item px-2">
                    <a class="btn btn-primary" href="/login">Sign Out</a>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NavWel;