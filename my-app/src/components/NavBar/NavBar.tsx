import React, { useContext } from "react";
import { ShopContext } from "../../App";
import { NavLink } from "react-router-dom";
import { INITIAL_USER_STATE } from "../../constants";

export const NavBar = () => {
  const logout = () => {
    sessionStorage.removeItem("userId");
    setUser(INITIAL_USER_STATE);
  };
  const { user, setUser, cart, setCart } = useContext(ShopContext);
  return (
    <header>
      <nav className="navbar navbar-light">
        <NavLink className="navbar-brand" to="/">
          <img
            src="/images/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top mr-1"
            alt=""
          />
          Chapter One
        </NavLink>
        <NavLink className="navbar navbar-dark ml-auto" to="/shop">
          Shop
        </NavLink>
        {user.id == -1 ? (
          <>
            <NavLink
              className="navbar navbar-dark mr-1"
              style={{ textAlign: "right" }}
              to="/login"
              id="login"
            >
              Login
            </NavLink>
            <NavLink
              className="navbar navbar-dark mr-1"
              to="/register"
              id="register"
            >
              Register
            </NavLink>
          </>
        ) : (
          <NavLink to="" onClick={logout}>
            Logout
          </NavLink>
        )}
        <NavLink
          id="navbar-msg"
          className="navbar nav-item navbar-text"
          style={{ textAlign: "right" }}
          to=""
        >
          {user.id == -1 ? "Welcome!" : `Welcome ${user.firstName}`}
        </NavLink>
        <NavLink to="/carts/1">
          <img
            src="/images/shopping-cart.png"
            width="30"
            alt="No image to shopping cart"
          />
        </NavLink>
      </nav>
    </header>
  );
};
