import React, { useContext, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { ShopHeaders } from "./ShopHeaders";
import { ShopFeatured } from "./ShopFeatured";
import { ShopFilter } from "./ShopFilter";
import { BookGrid } from "./BookGrid";
import "./Shop.css";
import { ShopContext } from "../../App";
import { Book } from "../../models/book.models";

export const Shop = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { user, setUser, cart, setCart } = useContext(ShopContext);
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
