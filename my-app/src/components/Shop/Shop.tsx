import React, { useContext, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { ShopHeaders } from "./ShopHeaders";
import { ShopFeatured } from "./ShopFeatured";
import { ShopFilter } from "./ShopFilter";
import { BookGrid } from "./BookGrid";
import "./Shop.css";
import bookData from "../../assets/books.json";
import { User } from "../../models/user.models";
import { CurrentUserContext } from "../../App";

export const Shop = () => {
  const [books, setBooks] = useState(bookData);
  const { user, setUser } = useContext(CurrentUserContext);
  return (
    <div>
      <NavBar />
      <ShopHeaders />
      <ShopFeatured />
      <section className="section-shop">
        <ShopFilter books={books} setBooks={setBooks} />
        <BookGrid books={books} />
      </section>
    </div>
  );
};
