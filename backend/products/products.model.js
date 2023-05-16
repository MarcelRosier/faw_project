import * as fs from "fs/promises";
const PRODUCT_DB = "products/books.json";

export async function getProducts(ids, language, author, genre) {
  let data = JSON.parse(await fs.readFile(PRODUCT_DB));
  return data.filter((book) => {
    return (
      (ids === "" || ids.indexOf(book.id) !== -1) &&
      (language === "" || book.language === language) &&
      (author === "" || book.author === author) &&
      (genre === "" || book.genre === genre)
    );
  });
}

export async function getFeaturedProducts() {
  let db = JSON.parse(await fs.readFile(PRODUCT_DB));
  return db.splice(7);
}

export async function getProductCategories() {
  let db = JSON.parse(await fs.readFile(PRODUCT_DB));
  // get unqiue genres (=categories)
  return db.reduce(
    (cats, book) => {
      if (cats["genre"].indexOf(book.genre) === -1) {
        cats["genre"].push(book.genre);
      }
      if (cats["author"].indexOf(book.author) === -1) {
        cats["author"].push(book.author);
      }
      if (cats["language"].indexOf(book.language) === -1) {
        cats["language"].push(book.language);
      }
      return cats;
    },
    { genre: [], author: [], language: [] }
  );
}

export async function getProductById(id) {
  let db = JSON.parse(await fs.readFile(PRODUCT_DB));
  let book = db.filter((book) => book.id === id);
  return book.length === 0 ? undefined : book[0];
}
export async function getProductsByCategory(category) {
  let db = JSON.parse(await fs.readFile(PRODUCT_DB));
  return db.filter((book) => book.genre === category);
}
