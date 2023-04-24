import React, { useEffect, useState } from "react";
import { ShopFeaturedItem } from "./ShopFeaturedItem";
import { Carousel } from "react-bootstrap";
import { Book } from "../../models/book.models";
import { API_HOST } from "../../constants";
import { message } from "react-message-popup";

async function fetchFeaturedBooks(setFtrBooks: (value: Book[]) => void) {
  try {
    const response = await fetch(`${API_HOST}/products/featured`);
    if (response.ok) {
      let books: Book[] = await response.json();
      setFtrBooks(books);
    }
  } catch (error) {
    message.error(`Error while featching featured books: ${error}`, 2500);
  }
}

export const ShopFeatured = () => {
  const [index, setIndex] = useState(0);
  const [ftrBooks, setFtrBooks] = useState<Book[]>([]);

  const handleSelect = (
    selectedIndex: number,
    e: Record<string, unknown> | null
  ) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    fetchFeaturedBooks(setFtrBooks);
  }, []);

  return (
    <section className="section-shop-featured">
      <h2>Community favorites</h2>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
        nextLabel={false}
        prevLabel={false}
      >
        {ftrBooks.map((book, i) => (
          <Carousel.Item key={i}>
            <ShopFeaturedItem book={book} />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};
