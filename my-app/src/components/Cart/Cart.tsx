import React, { useState, useEffect, useContext } from "react";
import { API_HOST } from "../../constants";
import { CartItemComponent } from "./CartItem";
import { User } from "../../models/user.models";
import { CurrentUserContext } from "../../App";
import { Carts, CartItem } from "../../models/cart.models";

export const Cart = () => {
  const { user } = useContext(CurrentUserContext);
  const [cart, setCart] = useState<Carts | null>(null);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await fetch(`${API_HOST}/carts/${user.id}`);
        const data = await response.json();
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    }

    fetchCart();
  }, [user]);

  if (!cart) {
    return <div>Loading cart...</div>;
  }

  return (
    <div>
      <h1>Cart</h1>
      {cart && cart.items.map((item) => (
        <CartItemComponent key={item.productId} cartItem={item} />
      ))}
      <a href="/">Back to index</a>
    </div>
  );
};
