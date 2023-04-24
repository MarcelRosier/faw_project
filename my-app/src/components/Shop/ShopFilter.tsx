import React, { ChangeEvent, useEffect } from "react";
import { Book } from "../../models/book.models";
import { API_HOST } from "../../constants";

async function filterBooks(
  language: string,
  author: string,
  genre: string,
  setBooks: (value: Book[]) => void
) {
  // TODO: maybe move filtering to backend?
  const response = await fetch(`${API_HOST}/products`);
  if (!response.ok) {
    throw Error("Error fetching books");
  }
  let books: Book[] = await response.json();
  let filteredBooks = books.filter((book: Book) => {
    return (
      (language === "" || book.language === language) &&
      (author === "" || book.author === author) &&
      (genre === "" || book.genre === genre)
    );
  });
  setBooks(filteredBooks);
}

export const ShopFilter = (props: {
  books: Book[];
  setBooks: (value: Book[]) => void;
}) => {
  // TODO: refactor, not clean code
  const [language, setLanguage] = React.useState("");
  const onLanguageChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setLanguage(value);
    filterBooks(value, author, genre, props.setBooks);
  };
  const [author, setAuthor] = React.useState("");
  const onAuthorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setAuthor(value);
    filterBooks(language, value, genre, props.setBooks);
  };
  const [genre, setGenre] = React.useState("");
  const onGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setGenre(value);
    filterBooks(language, author, value, props.setBooks);
  };

  useEffect(() => {
    filterBooks(language, author, genre, props.setBooks);
  }, []);

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
          <option value="English">English</option>
          <option value="German">German</option>
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
          <option value="James Gleick">James Gleick</option>
          <option value="Albert Camus">Albert Camus</option>
          <option value="Benedict Wells">Benedict Wells</option>
          <option value="Rutger Bregman">Rutger Bregman</option>
          <option value="Andrew Hodges">Andrew Hodges</option>
          <option value="Sylvia Nasar">Sylvia Nasar</option>
          <option value="John Scalzi">John Scalzi</option>
          <option value="Adrian Tchaikovsky">Adrian Tchaikovsky</option>
          <option value="Jill Gutowitz">Jill Gutowitz</option>
          <option value="Ashley Marie Farmer">Ashley Marie Farmer</option>
          <option value="Laura Silverman">Laura Silverman</option>
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
          <option value="science">Science</option>
          <option value="novel">Novel</option>
          <option value="essay">Essay</option>
          <option value="biography">Biography</option>
        </select>
      </div>
    </div>
  );
};
