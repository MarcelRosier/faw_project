import React, { MouseEvent } from "react";
import { Book } from "../../models/book.models";
import { message } from "react-message-popup";
import { NavLink } from "react-router-dom";

async function addToBasket(book: Book) {
  //TODO Call api
  // fetch ...
  // alert user that operation was sucessful
  message.success(`Added '${book.title}' to cart!`, 2000);
}
export const BookCard = (props: { book: Book }) => {
  const handleAdd = (event: MouseEvent) => {
    addToBasket(props.book);
  };
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch justify-content-center">
      <div className="card">
        <NavLink to={`/details/${props.book.id}`}>
          <img
            className="card-img-top"
            src={props.book.imageLink}
            alt={`img for ${props.book.title}`}
          />
        </NavLink>
        <div className="card-body">
          <h5 className="card-title">{props.book.title}</h5>
          <p className="card-text">{props.book.author}</p>
          <p className="card-text price">{`${(+props.book.price).toFixed(
            2
          )}$`}</p>
          <button className="btn btn-primary col-12" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
