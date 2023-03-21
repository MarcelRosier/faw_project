import * as fs from "fs/promises";
const PRODUCT_DB = "assets/id_books.json";

export async function getProducts() {
  return JSON.parse(await fs.readFile(PRODUCT_DB));
}

export async function getProductCategories() {
  let db = JSON.parse(await fs.readFile(PRODUCT_DB));
  // get unqiue genres (=categories)
  return db.reduce((cats, book) => {
    if (cats.indexOf(book.genre) === -1) {
      cats.push(book.genre);
    }
    return cats;
  }, []);
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
