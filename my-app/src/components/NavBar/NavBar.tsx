import React, { useContext } from "react";
import { CurrentUserContext } from "../../App";

export const NavBar = () => {
  const { user, setUser } = useContext(CurrentUserContext);
  return (
    <header>
      <nav className="navbar navbar-light">
        <a className="navbar-brand" href="/">
          <img
            src="/images/logo.png"
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
        {user.id == -1 ? (
          <>
            <a
              className="navbar navbar-dark mr-1"
              style={{ textAlign: "right" }}
              href="/login"
              id="login"
            >
              Login
            </a>
            <a
              className="navbar navbar-dark mr-1"
              href="/register"
              id="register"
            >
              Register
            </a>
          </>
        ) : (
          <a href="">Logout</a>
        )}
        <a
          id="navbar-msg"
          className="navbar nav-item navbar-text"
          style={{ textAlign: "right" }}
        >
          {user.id == -1 ? "Welcome!" : `Welcome ${user.firstName}`}
        </a>
        <a href="/carts/1">
          <img
            src="/images/shopping-cart.png"
            width="30"
            alt="No image to shopping cart"
          />
        </a>
      </nav>
    </header>
  );
};
