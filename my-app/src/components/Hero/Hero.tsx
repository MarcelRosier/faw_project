import React from "react";
import { NavLink } from "react-router-dom";

export const Hero = () => {
  return (
    <header className="index-header">
      <h1 className="display-2 index-header-h1">
        <em>Chapter One</em>
      </h1>
      <p className="lead" style={{ fontSize: "4vh", fontStyle: "italic" }}>
        Explore endless worlds, <br />
        one <strong>book</strong> at a time.
      </p>
      <NavLink className="btn btn-light btn-lg m-3" to="/shop">
        Start exploring
      </NavLink>
    </header>
  );
};
