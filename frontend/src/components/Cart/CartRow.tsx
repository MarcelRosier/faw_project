import React, { useContext, useState } from "react";
import { ShopContext } from "../../App";
import { Book } from "../../models/book.models";
import { API_HOST } from "../../constants";
import { Cart, User } from "../../models/user.models";
import { message } from "react-message-popup";

export async function updateCart(user: User, cart: Cart) {
  if (user.id === -1) return;
  try {
    const response = await fetch(`${API_HOST}/carts`, {
      method: "PUT",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        userId: user.id,
        cartItems: cart.items,
      }),
    });
    return response;
  } catch (error) {
    message.error(`Error while attempting to delete cart item: ${error}`, 2500);
  }
}

export const CartRow = (props: {
  quantity: number;
  book: Book | undefined;
}) => {
  const { user, setUser, cart, setCart } = useContext(ShopContext);
  const [quantity, setQuantity] = useState<number>(props.quantity);
  const handleRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!props.book) return;
    let bookId = props.book.id;
    setCart((prev) => {
      let newCart = { userId: prev.userId, items: [...prev.items] };
      newCart.items = newCart.items.filter((item) => item.productId !== bookId);
      updateCart(user, newCart);
      return newCart;
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!props.book) return;
    let bookId = props.book.id;
    let newQuantity = +event.target.value;
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    setCart((prev) => {
      let newCart = { userId: prev.userId, items: [...prev.items] };
      let index = newCart.items.findIndex((item) => item.productId === bookId);
      if (index !== -1) {
        newCart.items[index].quantity = newQuantity;
        updateCart(user, newCart);
      }
      return newCart;
    });
  };

  return props.book ? (
    <div className="row cart-row">
      <img className="book-image" src={props.book.imageLink} />
      <div className="book-details">
        <h5>{props.book.title}</h5>
        <p>{props.book.author}</p>
      </div>
      <div className="book-price">{`${props.book.price}$`}</div>
      <div className="book-quantity">
        <input
          type="number"
          value={quantity}
          min={1}
          onChange={handleInputChange}
        />
      </div>
      <div className="book-removal">
        <button className="btn btn-sm btn-danger" onClick={handleRemove}>
          X
        </button>
      </div>
      <div className="book-total-price">{`${(
        +props.book.price * props.quantity
      ).toFixed(2)}$`}</div>
    </div>
  ) : (
    <>Book not found :/</>
  );
};
