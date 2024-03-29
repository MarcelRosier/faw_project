import React, { MouseEvent, useContext } from "react";
import { Book } from "../../models/book.models";
import { message } from "react-message-popup";
import { NavLink, useRevalidator } from "react-router-dom";
import { User, Cart, CartItem } from "../../models/user.models";
import { ShopContext } from "../../App";
import { API_HOST } from "../../constants";

async function addToBasket(book: Book, user: User) {
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      productId: book.id,
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
  const { user, setUser, cart, setCart } = useContext(ShopContext);
  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (user.id === -1) {
      // only add to local context
      setCart((prev) => {
        let index = cart.items.findIndex(
          (item) => item.productId === props.book.id
        );
        if (index === -1) {
          return {
            ...prev,
            items: [
              ...prev.items,
              {
                productId: props.book.id,
                quantity: 1,
              },
            ],
          };
        } else {
          let newItems = prev.items.map((x) => Object.assign({}, x));
          newItems[index].quantity += 1;
          return {
            ...prev,
            items: newItems,
          };
        }
      });
      message.success(`Added '${props.book.title}' to cart!`, 2000);
    } else {
      addToBasket(props.book, user);
    }
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
