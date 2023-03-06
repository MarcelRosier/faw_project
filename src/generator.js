import { addToCart, getActiveUser } from "./utils.js";

async function generateContent() {
  // get book data
  let bookData = await fetch("/assets/books.json").then((response) =>
    response.json()
  );

  const languageFilter = document.getElementById("language-filter");
  const authorFilter = document.getElementById("author-filter");
  const genreFilter = document.getElementById("genre-filter");

  /* make cards for filtered data */
  function filterAndGenerateCards() {
    /* get filter values */
    let languageValue = languageFilter.value;
    let authorValue = authorFilter.value;
    let genreValue = genreFilter.value;

    // filter book data based on filter values (Note:  If any of the filters are set to an empty string, the filter-method is ignored and all books are included shown)
    let filteredBooks = bookData.filter((book) => {
      return (
        (languageValue === "" || book.language === languageValue) &&
        (authorValue === "" || book.author === authorValue) &&
        (genreValue === "" || book.genre === genreValue)
      );
    });

    /* create new cards for filtered data */
    let cardContainer = document.getElementById("main_content_row");
    cardContainer.innerHTML = "";
    for (const book of filteredBooks) {
      generateCard(book);
    }
  }

  /* create initial cards */
  for (const book of bookData) {
    generateCard(book);
  }

  /* Calls filterAndGenerateCards on change */
  languageFilter.addEventListener("change", filterAndGenerateCards);
  authorFilter.addEventListener("change", filterAndGenerateCards);
  genreFilter.addEventListener("change", filterAndGenerateCards);
}

async function generateCarousel() {
  let bookData = await fetch("/assets/books.json")
    .then((response) => response.json())
    .catch(() => console.log("json not found!"));

  bookData = bookData.splice(7);
  let carouselContent = document.getElementById("carousel-content");
  let carouselIndicator = document.getElementById("carousel-indicator");
  function generateCarouselItem(book, index) {
    let itemDiv = document.createElement("div");
    let itemLink = document.createElement("a");
    let itemImg = document.createElement("img");
    itemDiv.className = index == 0 ? "carousel-item active" : "carousel-item";
    //link
    itemLink.href = "/src/productDetails.html?title=" + book.title;

    // img
    itemImg.className = "img-fluid d-block w-100";
    itemImg.src = book.imageLink;
    itemImg.alt = book.title;
    carouselContent.append(itemDiv);
    itemDiv.append(itemLink);
    itemLink.append(itemImg);

    // add indicator
    let listItem = document.createElement("li");
    listItem.setAttribute("data-target", "#myCarousel");
    listItem.setAttribute("data-slide-to", index);
    if (index == 0) {
      listItem.className = "active";
    }

    carouselIndicator.append(listItem);
  }
  for (let i = 0; i < bookData.length; i++) {
    generateCarouselItem(bookData[i], i);
  }
  console.log(bookData.slice(6));
}

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
  let imageLink = document.createElement("a");
  /* add book Event listener to button */
  addButton.onclick = function () {
    addToCart(book);
  };

  // create Hierarchy
  outerDiv.append(cardDiv);
  cardDiv.append(imageLink);
  imageLink.append(img);
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
  imageLink.href = "/src/productDetails.html?title=" + book.title;
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
          document.getElementById("bookname").innerText = element.title;
          document.getElementById("authorname").innerText = element.author;
          document.getElementById("publishedyear").innerText = element.year;
          document.getElementById("bookgenre").innerText = element.genre;
          document.getElementById("description").innerText =
            element.description;
          let img = document.getElementById("book-cover");
          img.src = element.imageLink;
          img.setAttribute("class", " col-sm-12 d-flex align-items-center");

          const res = document.getElementById("btn-add");
          res.onclick = () => addToCart(element);
        }
      });
    });
}

window.generateContent = generateContent;
window.getActiveUser = getActiveUser;
window.getBookImageDescription = getBookImageDescription;
window.generateCarousel = generateCarousel;
