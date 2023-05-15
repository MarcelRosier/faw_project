import React, { useContext } from "react";
import { NavBar } from "../NavBar/NavBar";
import { ShopContext } from "../../App";
import { Book } from "../../models/book.models";

export const CartRow = (props: {
  id: number;
  quantity: number;
  book: Book | undefined;
}) => {
  return props.book ? (
    <div key={props.id} className="row cart-row">
      <img className="book-image" src={props.book.imageLink} />
      <div className="book-details">
        <h5>{props.book.title}</h5>
        <p>{props.book.author}</p>
      </div>
      <div className="book-price">{`${props.book.price}$`}</div>
      <div className="book-quantity">
        <input type="number" value={props.quantity} min={1} />
      </div>
      <div className="book-removal">
        <button className="btn btn-sm btn-danger">X</button>
      </div>
      <div className="book-total-price">{`${+props.book.price *
        props.quantity}$`}</div>
    </div>
  ) : (
    <>Book not found :/</>
  );
};
