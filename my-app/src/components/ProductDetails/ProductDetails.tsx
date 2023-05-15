import React, { useEffect, useState, useContext } from "react";
import { NavBar } from "../NavBar/NavBar";
import { Nav, NavDropdown } from "react-bootstrap";
import { API_HOST } from "../../constants";
import { Book } from "../../models/book.models";
import { User, Cart } from "../../models/user.models";
import { ShopContext } from "../../App";
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
async function addToBasket(book: Book, user: User) {
  const params = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      productId: book.id,
      cartId: user.id, // TODO: change this to proper id later
    }),
  };

  try {
    let response = await fetch(`${API_HOST}/carts`, params);
    // alert user that operation was sucessful
    if (response.ok) {
      message.success(`Added '${book.title}' to cart!`, 2000);
    }
  } catch (error) {
    message.error(
      "Whoopsie! An error occured while adding your item to the basket"
    );
  }
}
export const ProductDetails = () => {
  const { user, setUser, cart, setCart } = useContext(ShopContext);
  const [book, setBook] = useState<Book>();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) return;
    fetchBook(id, setBook);
  }, []);

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!user || !book) return;
    if (user.id === -1) {
      // only add to local context
      setCart((prev) => {
        let index = cart.items.findIndex((item) => item.productId === book.id);
        if (index === -1) {
          return {
            ...prev,
            items: [
              ...prev.items,
              {
                productId: book.id,
                quantity: 1,
              },
            ],
          };
        } else {
          let newItems = prev.items.map((x) => Object.assign({}, x));
          newItems[index].quantity += 1;
          return {
            ...prev,
            items: newItems,
          };
        }
      });
      message.success(`Added '${book.title}' to cart!`, 2000);
    } else {
      addToBasket(book, user);
    }
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
              <button
                id="btn-add"
                className="btn btn-primary"
                onClick={handleAdd}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
