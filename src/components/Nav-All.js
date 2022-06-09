import React from 'react'

//This is temporary for testing

const NavAll = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-danger">
            <div class="navbar-collapse collapse">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/">Welcome</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/dashboard">Home</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/settings">Settings</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/profile">Profile</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/campaign">Campaign</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/gym">Gym</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/exercise">Exercise</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/reset1">Reset1</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/reset2">Reset2</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/reset3">Reset3</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/score">Score</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/register">Register</a>
                    </li>
                    <li class="nav-item px-3">
                        <a class="nav-link" href="/login">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
  }

  export default NavAll;