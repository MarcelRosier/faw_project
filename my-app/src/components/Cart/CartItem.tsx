import React, { useState, useEffect } from "react";
import { Book } from "../../models/book.models";
import { API_HOST } from "../../constants";
import { CartItem as CartItemType } from "../../models/cart.models";

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItemComponent = (props: CartItemProps) => {
  const { cartItem } = props;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${API_HOST}/products/${cartItem.productId}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    }

    fetchBook();
  }, [cartItem]);

  if (!book) {
    return <div>Loading book...</div>;
  }

  return (
    <div>
      <img src={book.imageLink} alt={`image for ${book.title}`} />
      <p>{book.title}</p>
      <p>{book.author}</p>
      <p>Price: {book.price}</p>
      <p>Quantity: {cartItem.quantity}</p>
    </div>
  );
};

