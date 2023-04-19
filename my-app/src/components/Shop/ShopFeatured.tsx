import React, { useState } from "react";
import bookData from "../../assets/books.json";
import { ShopFeaturedItem } from "./ShopFeaturedItem";
import { Carousel } from "react-bootstrap";
import { Book } from "../../models/book.models";

const data: Book[] = [...bookData].splice(7);

export const ShopFeatured = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };
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
        {data.map((book, i) => (
          <Carousel.Item key={i}>
            <ShopFeaturedItem book={book} />
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  );
};
