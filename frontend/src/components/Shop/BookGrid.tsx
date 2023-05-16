import React from "react";
import { Books } from "../../models/book.models";
import { BookCard } from "./BookCard";
export const BookGrid = (props: Books) => {
  return (
    <div className="row">
      {props.books.length > 0 ? (
        props.books.map((book, i) => <BookCard key={i} book={book} />)
      ) : (
        <p className="lead" style={{ textAlign: "center" }}>
          Sadly no books matched your filter selection :/
        </p>
      )}
    </div>
  );
};
