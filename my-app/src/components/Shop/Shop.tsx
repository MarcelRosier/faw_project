import React, { useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { ShopHeaders } from "./ShopHeaders";
import { ShopFeatured } from "./ShopFeatured";
import { ShopFilter } from "./ShopFilter";
import { BookGrid } from "./BookGrid";
import "./Shop.css";
import bookData from "../../assets/books.json";

export const Shop = () => {
  const [books, setBooks] = useState(bookData);
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
