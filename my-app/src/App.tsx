import React, { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Hero } from "./components/Hero/Hero";
import { Shop } from "./components/Shop/Shop";
import { Cart } from "./components/Cart/Cart";
import { ProductDetails } from "./components/ProductDetails/ProductDetails";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { User, UserContext } from "./models/user.models";

const initialUserState: User = {
  id: -1,
  firstName: "-",
  lastName: "-",
  email: "-",
  password: "-",
};
export const CurrentUserContext = createContext<UserContext>({
  user: initialUserState,
  setUser: (value: User) => {},
});

function App() {
  const [user, setUser] = useState(initialUserState);
  const intialUserContext: UserContext = {
    user: user,
    setUser: setUser,
  };
  // const CurrentUserContext = React.createContext(intialUserContext);

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
