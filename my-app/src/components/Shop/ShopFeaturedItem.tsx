import React, { useState } from "react";
import { Book } from "../../models/book.models";
import { CarouselItem } from "react-bootstrap";

export const ShopFeaturedItem = (props: { book: Book }) => {
  return (
    <a href={`/details/${props.book.id}`}>
      <img src={props.book.imageLink} alt={`img for ${props.book.title}`} />
    </a>
  );
};
