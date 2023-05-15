import React, { createContext, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hero } from "./components/Hero/Hero";
import { Shop } from "./components/Shop/Shop";
import { Cart } from "./components/Cart/Cart";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { User, UserContext } from "./models/user.models";
import { API_HOST, INITIAL_USER_STATE } from "./constants";

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
export const CurrentUserContext = createContext<UserContext>({
  user: INITIAL_USER_STATE,
  setUser: (value: User) => {},
});

function App() {
  const [user, setUser] = useState(INITIAL_USER_STATE);
  const intialUserContext: UserContext = {
    user: user,
    setUser: setUser,
  };
  // const CurrentUserContext = React.createContext(intialUserContext);

  useEffect(() => {
    getUserFromSession(setUser);
  }, []);
  return (
    <CurrentUserContext.Provider value={intialUserContext}>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
