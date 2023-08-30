import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartitems } from "../slicers/cartslice";

export default function NavBar() {
  let name = sessionStorage.getItem("name");
  let role = sessionStorage.getItem("role");
  const cart = useSelector(cartitems);
  let navigate = useNavigate();

  const logOut = () => {
    fetch("http://localhost:8080/logout").then((response) => {
      if (response.ok) {
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("role");
        navigate("/");
      }
    });
  };

  return (
    <div>
      <header>
        <h1 class="site-heading text-center text-faded d-none d-lg-block">
            <span class="site-heading-lower">Fancy Movies</span>
        </h1>
      </header>
      <nav class="navbar navbar-expand-lg navbar-dark py-lg-4" id="mainNav">
        <div class="container">
          <a
            class="navbar-brand text-uppercase fw-bold d-lg-none"
            href="/"
          >
            Fancy Movies
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mx-auto">
              <li class="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase" aria-current="page" to="/">
                  <b>About</b>
                </NavLink>
              </li>
              <li class="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase" to="/movies">
                  <b>Movies</b>
                </NavLink>
              </li>
              <li class="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase" to="/contact">
                  <b>Contact</b>
                </NavLink>
              </li>
              <li class="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase" to="/register">
                  Register
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav me-right mb-2 mb-lg-0 ms-lg-4">
            {role === "user" && (
              <>
                <li className="nav-item px-lg-4">
                  <li className="nav-item px-lg-4">
                    <NavLink className="nav-link text-uppercase" to="/cart">
                      <i className="bi-cart-fill me-1"></i>
                      <b>Cart</b>
                      <span className="badge bg-black text-white ms-1 rounded-pill">
                        {cart.length}
                      </span>
                    </NavLink>
                  </li>
                </li>
                <li className="nav-item px-lg-4">
                  <NavLink className="nav-link text-uppercase" to={"/profile/" + name}>
                    <b>Profile</b>
                  </NavLink>
                </li>
              </>
            )}
            {(name === null || name === "") && (
              <li className="nav-item px-lg-4">
                <NavLink className="nav-link text-uppercase" to="/login">
                  <b>Log In</b>
                </NavLink>
              </li>
            )}
            {name !== null && name !== "" && (
              <li className="nav-item px-lg-4">
                <a className="nav-link text-uppercase" href="/" onClick={() => logOut()}>
                  <b>Log Out</b>
                </a>
              </li>
            )}
          </ul>
          </div>
        </div>
      </nav>
      
    </div>
  );
}
