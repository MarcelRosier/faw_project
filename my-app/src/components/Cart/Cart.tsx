import React, { useState, useEffect, useContext } from "react";
import { API_HOST } from "../../constants";
import { CartItemComponent } from "./CartItem";
import { User } from "../../models/user.models";
import { CurrentUserContext } from "../../App";
import { Carts, CartItem } from "../../models/cart.models";
import { NavBar } from "../NavBar/NavBar";
import  CartHeader from "./CartHeader";


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

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setCart((prevCart) => {
      if (!prevCart) return null;

      const updatedItems = prevCart.items.map((item) => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      return { ...prevCart, items: updatedItems };
    });
  };

  const handleRemoveBook = (productId: number) => {
    setCart((prevCart) => {
      if (!prevCart) return null;

      const updatedItems = prevCart.items.filter(
        (item) => item.productId !== productId
      );

      return { ...prevCart, items: updatedItems };
    });
  };

  return (
    <div>
      <NavBar />
      <h1>Cart</h1>
      <hr></hr>
        <div className="container">
        <CartHeader />
          {cart && cart.items.map((item) => (
                     <CartItemComponent
                     key={item.productId}
                     cartItem={item}
                     onQuantityChange={handleQuantityChange}
                     onRemoveBook={handleRemoveBook}
                   />
          ))}
        </div>
      <a href="/">Back to index</a>
    </div>
  );
};
