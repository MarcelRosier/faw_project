import React from "react";
import { Books } from "../../models/book.models";
import { BookCard } from "./BookCard";
export const BookGrid = (props: Books) => {
  return (
    <div className="row">
      {props.books.map((book, i) => (
        <BookCard key={i} book={book} />
      ))}
    </div>
  );
};
