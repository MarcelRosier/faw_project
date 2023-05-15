import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hero } from "./components/Hero/Hero";
import { Cart } from "./components/Cart/Cart";
import { Shop } from "./components/Shop/Shop";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import {
  User,
  Cart as CartType,
  ShopContext as ShopContextType,
} from "./models/user.models";
import { API_HOST, INITIAL_CART_STATE, INITIAL_USER_STATE } from "./constants";

async function getUserFromSession(setUser: (value: User) => void) {
  let sessionUserId = sessionStorage.getItem("userId");
  if (!sessionUserId) {
    return;
  }
  const response = await fetch(`${API_HOST}/users/${sessionUserId}`);
  if (!response.ok) {
    return;
  }
  let user = await response.json();
  setUser(user);
}
export const ShopContext = createContext<ShopContextType>({
  user: INITIAL_USER_STATE,
  setUser: () => (value: User) => {},
  cart: INITIAL_CART_STATE,
  setCart: () => (value: CartType) => {},
});

function App() {
  const [user, setUser] = useState<User>(INITIAL_USER_STATE);
  const [cart, setCart] = useState<CartType>(INITIAL_CART_STATE);
  const intialShopContext: ShopContextType = {
    user: user,
    setUser: setUser,
    cart: cart,
    setCart: setCart,
  };

  useEffect(() => {
    getUserFromSession(setUser);
  }, []);
  return (
    <ShopContext.Provider value={intialShopContext}>
      <BrowserRouter>
        <Routes>
          <Route path="/shop" element={<Shop />} />
          <Route path="/carts/:id" element={<Cart />} />
          <Route path="/details/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Hero />} />
        </Routes>
      </BrowserRouter>
    </ShopContext.Provider>
  );
}

export default App;
