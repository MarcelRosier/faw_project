import React, { useEffect, useState } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Nav, NavDropdown } from "react-bootstrap";
import { API_HOST } from "../../constants";
import { Book } from "../../models/book.models";
import { message } from "react-message-popup";
import { useParams } from "react-router-dom";

async function fetchBook(id: string, setBook: (value: Book) => void) {
  try {
    const response = await fetch(`${API_HOST}/products/${id}`);
    if (response.ok) {
      let book: Book = await response.json();
      setBook(book);
    }
  } catch (error) {
    message.error(`Error while featching featured books: ${error}`, 2500);
  }
}

export const ProductDetails = () => {
  const [book, setBook] = useState<Book>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    fetchBook(id ? id : "1", setBook);
  }, []);

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    // addToBasket(book, user);
  };

  if (!book) {
    return (
      <>
        <NavBar />
        <div>Loading...</div>
      </>
    );
  }
  return (
    <div>
      <NavBar />
      <section className="container d-flex m-auto">
        <div className="row">
          <div className="col-md-6 col-sm-12 p-4" id="image_occupied">
            <img
              id="book-cover"
              className="col d-flex align-items-center"
              style={{ borderRadius: "30px" }}
              src={book.imageLink}
              alt="Image not found"
            />
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="card w-100 p-4" style={{ padding: "30px" }}>
              <h2 id="bookname" className="mt-2">
                {book.title}
              </h2>
              <h3
                className="mt-2"
                style={{ color: "rgb(40, 171, 156)" }}
                id="authorname"
              >
                {book.author}
              </h3>
              <p
                className="text-left"
                style={{ fontSize: "18px" }}
                id="publishedyear"
              >
                {book.year}
              </p>
              <p style={{ fontSize: "18px" }} id="bookgenre">
                {book.genre}
              </p>
              <p
                className="mt-1 text-align-right"
                style={{ fontSize: "18px" }}
                id="price"
              >
                {book.price}
              </p>
              <article>
                <h5 className="fw-bold">Description</h5>
                <section id="description" className="mb-5">
                  {book.description}
                </section>
              </article>
              <p id="price" className="mb-5"></p>
              <button id="btn-add" className="btn btn-primary">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
