import { addToCart, getActiveUser } from "./utils.js";

async function generateContent() {
  // load book data
  let bookData = await fetch("/assets/books.json").then((response) =>
    response.json()
  );

  for (const book of bookData) {
    generateCard(book);
  }
}
// /* Add book to cart */
// function addToCart_legacy(book) {
//   console.log("book:", book);
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   console.log("cart before:", cart);
//   cart.push(book);
//   localStorage.setItem("cart", JSON.stringify(cart));
//   console.log("cart after:", cart);
//   alert(`${book.title} added to cart!`);
// }

function generateCard(book) {
  // Init
  let outerDiv = document.createElement("div");
  let cardDiv = document.createElement("div");
  let img = document.createElement("img");
  let cardBodyDiv = document.createElement("div");
  let cardTitleH5 = document.createElement("h5");
  let authorNameP = document.createElement("p");
  let bookPrice = document.createElement("p");
  let addButton = document.createElement("button");
  /* add book Event listener to button */
  addButton.onclick = function () {
    addToCart(book);
  };

  // create Hierarchy
  outerDiv.append(cardDiv);
  cardDiv.append(img);
  cardDiv.append(cardBodyDiv);
  cardBodyDiv.append(cardTitleH5);
  cardBodyDiv.append(authorNameP);
  cardBodyDiv.append(bookPrice);
  cardBodyDiv.append(addButton);

  //   add content and attributes
  outerDiv.setAttribute(
    "class",
    "col-sm-6 col-md-6 col-lg-4 col-xl-3 d-flex align-items-stretch justify-content-center"
  );
  cardDiv.setAttribute("class", "card");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", book.imageLink);
  cardBodyDiv.setAttribute("class", "card-body");
  cardTitleH5.setAttribute("class", "card-title");
  cardTitleH5.innerHTML = book.title;
  authorNameP.setAttribute("class", "card-text");
  authorNameP.innerHTML = book.author;
  bookPrice.setAttribute("class", "card-text");
  bookPrice.innerHTML = book.price;
  addButton.setAttribute("class", "btn btn-primary col-12");
  addButton.innerHTML = "Add to cart";

  // add to row
  let row = document.getElementById("main_content_row");
  row.append(outerDiv);
}

async function getBookImageDescription(title) {
  await fetch("/assets/books.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        if (element.title === title) {
          const result1 = document.getElementById("bookname");
          result1.innerText = element.title;
          const result2 = document.getElementById("authorname");
          result2.innerText = element.author;
          const result3 = document.getElementById("publishedyear");
          result3.innerText = element.year;
          const result4 = document.getElementById("bookgenre");
          result4.innerText = element.genre;
          const result5 = document.getElementById("description");
          result5.innerText = element.description;

          const res = document.getElementById("btn-add");
          res.onclick = () => addToCart(element);
        }
      });
    });
}

async function getBookImage(title) {
  await fetch("/assets/books.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        if (element.title === title) {
          const result1 = document.querySelector("image");
          result1.src = element.imageLink;
          /*cardDiv = document.createElement("div");
  img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", book.imageLink);
  */
        }
      });
    });
}

function openShop() {
  window.open("/src/checkout.html");
}

window.generateContent = generateContent;
window.getActiveUser = getActiveUser;
window.getBookImageDescription = getBookImageDescription;
window.getBookImage = getBookImage;
