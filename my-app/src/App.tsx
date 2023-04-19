import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hero } from "./components/Hero/Hero";
import { Shop } from "./components/Shop/Shop";
import { Cart } from "./components/Cart/Cart";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/carts/:id" element={<Cart />} />
        {/* <Route path="/checkout" element={<Checkout/>} /> */}
        <Route path="/details/:id" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Hero />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
