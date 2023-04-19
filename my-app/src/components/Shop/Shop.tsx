import React from "react";
import { NavBar } from "../NavBar/NavBar";
import { ShopHeaders } from "./ShopHeaders";
import { ShopFeatured } from "./ShopFeatured";
import "./Shop.css";

export const Shop = () => {
  return (
    <div>
      <NavBar />
      <ShopHeaders />
      <ShopFeatured />
    </div>
  );
};
