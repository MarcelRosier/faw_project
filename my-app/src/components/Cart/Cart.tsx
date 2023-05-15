import React, { useContext, useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { ShopContext } from "../../App";
import "./Cart.css";
import { Book } from "../../models/book.models";
import { CartItem, Cart as CartType } from "../../models/user.models";
import { API_HOST } from "../../constants";
import { message } from "react-message-popup";
import { CartRow } from "./CartRow";
import { User } from "../../models/user.models";

async function fetchBooks(cart: CartType, setBooks: (books: Book[]) => void) {
  try {
    const response = await fetch(
      `${API_HOST}/products?id=${cart.items
        .map((item) => item.productId)
        .join(",")}`
    );
    if (response.ok) {
      let books: Book[] = await response.json();
      setBooks(books);
    }
  } catch (error) {
    message.error(`Error while featching featured books: ${error}`, 2500);
  }
}

async function fetchCart(
  user: User,
  setCart: (cart: CartType) => void,
  setBooks: (books: Book[]) => void
) {
  try {
    const response = await fetch(`${API_HOST}/carts?userId=${user.id}`);
    if (response.ok) {
      let cart: CartType = await response.json();
      setCart(cart);
      await fetchBooks(cart, setBooks);
    }
  } catch (error) {
    message.error(`Error while featching cart: ${error}`, 2000);
  }
}

export const Cart = () => {
  const { user, setUser, cart, setCart } = useContext(ShopContext);
  const [books, setBooks] = useState<Book[]>([]);
  useEffect(() => {
    // fetch cart
    if (user.id !== -1) {
      fetchCart(user, setCart, setBooks);
    } else {
      fetchBooks(cart, setBooks);
    }
  }, [user]);

  const getBookById = (id: number) => {
    return books.find((book) => book.id === id);
  };
  const getTotalPrice = () => {
    return cart.items.reduce((acc, item) => {
      let book = getBookById(item.productId);
      if (!book) return acc;
      return acc + +book.price * item.quantity;
    }, 0);
  };
  return (
    <>
      <NavBar />

      <div className="container">
        <div className="shop-headers" style={{ margin: "20px 0px" }}>
          <h3>Shopping Cart</h3>
        </div>
        {cart.items.length === 0 ? (
          <p className="lead" style={{ textAlign: "center" }}>
            Wow, such empty!
          </p>
        ) : (
          <>
            <div className="row cart-row-header">
              <label className="book-image"></label>
              <label className="book-details"></label>
              <label className="book-price"></label>
              <label className="book-quantity">Quantity</label>
              <label className="book-removal"></label>
              <label className="book-total-price">Total</label>
            </div>
            <hr id="cart-header-hr" />

            <div id="cart-content">
              {cart.items.map((item, i) => (
                <CartRow
                  key={i}
                  id={i}
                  quantity={item.quantity}
                  book={getBookById(item.productId)}
                />
              ))}
            </div>
            <div className="row grand-total-price">
              <h5>Grand total</h5>
              <p id="grand-total">{`${getTotalPrice()}$`}</p>
              <button className="btn btn-primary checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
