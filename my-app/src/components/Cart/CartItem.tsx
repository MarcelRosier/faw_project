import React, { useState, useEffect } from "react";
import { Book } from "../../models/book.models";
import { API_HOST } from "../../constants";
import { CartItem as CartItemType } from "../../models/cart.models";
import "./CartItem.css";

type CartItemProps = {
  cartItem: CartItemType;
  onQuantityChange: (productId: number, newQuantity: number) => void;
  onRemoveBook: (productId: number) => void;
};

export const CartItemComponent = (props: CartItemProps) => {
  const { cartItem, onQuantityChange, onRemoveBook } = props;

  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `${API_HOST}/products/${cartItem.productId}`
        );
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

  const totalPrice = Number(book.price) * cartItem.quantity;

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuantityChange(cartItem.productId, parseInt(event.target.value));
  };

  const handleRemoveBook = () => {
    onRemoveBook(cartItem.productId);
  };

  return (
    <div className="row cart-item g-0 mb-4">
      <div className="col-sm-2">
        <img src={book.imageLink} alt={`image for ${book.title}`} />
      </div>

      <div className="col-sm-3">
        <p>{book.title}</p>
        <p>{book.author}</p>
      </div>

      <div className="col-sm-2">
        <p>Price: {book.price}</p>
      </div>

      <div className="col-sm-3">
        <input type="number" value={cartItem.quantity} min="1" onChange={handleQuantityChange} />
        <button className="btn btn-sm btn-danger" onClick={handleRemoveBook}>
          X
        </button>
      </div>

      <div className="col-sm-2">
        <p>Total Price: {totalPrice.toFixed(2)}</p>
      </div>
    </div>
  );
};
