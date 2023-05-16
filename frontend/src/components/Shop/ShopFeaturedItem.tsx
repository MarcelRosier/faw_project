import React, { useState } from "react";
import { Book } from "../../models/book.models";
import { CarouselItem } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ShopFeaturedItem = (props: { book: Book }) => {
  return (
    <NavLink to={`/details/${props.book.id}`}>
      <img src={props.book.imageLink} alt={`img for ${props.book.title}`} />
    </NavLink>
  );
};
