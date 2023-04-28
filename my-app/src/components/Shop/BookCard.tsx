import React, { MouseEvent, useContext } from "react";
import { Book } from "../../models/book.models";
import { message } from "react-message-popup";
import { NavLink } from "react-router-dom";
import { User } from "../../models/user.models";
import { CurrentUserContext } from "../../App";
import { API_HOST } from "../../constants";

async function addToBasket(book: Book, user: User) {
  //TODO Call api
  // fetch ...
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      productId: book.id,
      cartId: user.id, // TODO: change this to proper id later
    }),
  };
  try {
    let response = await fetch(`${API_HOST}/carts`, params);
    // alert user that operation was sucessful
    if (response.ok) {
      message.success(`Added '${book.title}' to cart!`, 2000);
    }
  } catch (error) {
    message.error(
      "Whoopsie! An error occured while adding your item to the basket"
    );
  }
}
export const BookCard = (props: { book: Book }) => {
  const { user, setUser } = useContext(CurrentUserContext);
  const handleAdd = (event: MouseEvent) => {
    addToBasket(props.book, user);
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
