import React from "react";
import logo from "../../assets/images/logo.png";
import cartImg from "../../assets/images/shopping-cart.png";

export const NavBar = () => {
  return (
    <header>
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          Chapter One
        </a>
        <a className="navbar navbar-dark ml-auto" href="/shop">
          Shop
        </a>
        <a
          className="navbar navbar-dark mr-1"
          style={{ textAlign: "right" }}
          href="/login"
          id="login"
        >
          Login
        </a>
        <a className="navbar navbar-dark mr-1" href="/register" id="register">
          Register
        </a>
        <a
          id="navbar-msg"
          className="navbar nav-item navbar-text"
          style={{ textAlign: "right" }}
        >
          Welcome
        </a>
        <a href="/carts/1">
          <img src={cartImg} width="30" alt="No image to shopping cart" />
        </a>
      </nav>
    </header>
  );
};
