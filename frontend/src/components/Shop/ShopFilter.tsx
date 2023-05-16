import React, { ChangeEvent, useEffect, useState } from "react";
import { Book } from "../../models/book.models";
import { API_HOST } from "../../constants";
import { message } from "react-message-popup";

type Categories = {
  genre: string[];
  language: string[];
  author: string[];
};

async function filterBooks(
  language: string,
  author: string,
  genre: string,
  setBooks: (value: Book[]) => void
) {
  try {
    const response = await fetch(
      `${API_HOST}/products?language=${language}&author=${author}&genre=${genre}`
    );
    if (!response.ok) {
      throw Error("Error fetching books");
    }
    setBooks(await response.json());
  } catch (error) {
    message.error(`Error while fetching book data: ${error}`, 2500);
  }
}

async function fetchCategories(setCategories: (value: Categories) => void) {
  try {
    const response = await fetch(`${API_HOST}/products/categories`);
    if (!response.ok) {
      throw Error("Error fetching categories");
    }
    setCategories(await response.json());
  } catch (error) {
    message.error(`Error while fetching category data: ${error}`, 2500);
  }
}

export const ShopFilter = (props: {
  books: Book[];
  setBooks: (value: Book[]) => void;
}) => {
  const [categories, setCategories] = useState<Categories>({
    language: [],
    author: [],
    genre: [],
  });
  const [language, setLanguage] = useState("");
  const onLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLanguage(value);
  };
  const [author, setAuthor] = useState("");
  const onAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAuthor(value);
  };
  const [genre, setGenre] = useState("");
  const onGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setGenre(value);
  };

  useEffect(() => {
    fetchCategories(setCategories);
    filterBooks(language, author, genre, props.setBooks);
  }, [language, author, genre]);

  // TODO: make hardcoded values dynamic based on data or get them via an API call
  return (
    <div className="filter-container d-flex row mb-5">
      <div className="col-sm-4 ">
        <label htmlFor="language-filter" className="form-label">
          Language
        </label>
        <select
          id="language-filter"
          className="form-select"
          onChange={onLanguageChange}
        >
          <option value="">All Languages</option>
          {categories.language.map((language, i) => (
            <option key={i} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      <div className="col-sm-4">
        <label htmlFor="author-filter" className="form-label">
          Author
        </label>
        <select
          id="author-filter"
          className="form-select"
          onChange={onAuthorChange}
        >
          <option value="">All Authors</option>
          {categories.author.map((author, i) => (
            <option key={i} value={author}>
              {author}
            </option>
          ))}
        </select>
      </div>
      <div className="col-sm-4">
        <label htmlFor="genre-filter" className="form-label">
          Genre
        </label>
        <select
          id="genre-filter"
          className="form-select"
          onChange={onGenreChange}
        >
          <option value="">All Genres</option>
          {categories.genre.map((genre, i) => (
            <option key={i} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
