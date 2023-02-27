import { getCart, setCart } from "./utils.js";

function displayCart() {
  let cart = getCart();

  let cartContent = document.getElementById("cart-content");
  cartContent.innerHTML = "";
  // add a row for each cart item
  for (let item of cart.values()) {
    let row = generateCartRow(item);
    cartContent.append(row);
  }
  if (cart === undefined || cart.size == 0) {
    let emptyCart = document.createElement("h2");
    emptyCart.style = "text-align: center;";
    emptyCart.className = "lead";
    emptyCart.innerHTML = "Wow, so much empty!";
    cartContent.append(emptyCart);
  }

  // caclculate total rice
  calculateTotalPrice(cart);
}

function calculateTotalPrice(cart) {
  let items = Array.from(cart.values());
  let total = items.reduce(
    (acc, item) => acc + +item.book.price * +item.quantity,
    0
  );
  document.getElementById("grand-total").innerHTML = `${total.toFixed(2)}$`;
}

function generateCartRow(item) {
  let book = item.book;
  let row = document.createElement("div");
  // cover image
  let bookImage = document.createElement("div");
  let img = document.createElement("img");
  //details
  let bookDetails = document.createElement("div");
  let bookDetailsTitle = document.createElement("h6");
  let bookDetailsAuthor = document.createElement("p");
  //price
  let bookPrice = document.createElement("div");

  // quantity
  let bookQuantity = document.createElement("div");
  let bookQuantityInput = document.createElement("input");

  // remove
  let bookRemoval = document.createElement("div");
  let bookRemovalBtn = document.createElement("button");
  //total price
  let bookTotalPrice = document.createElement("div");

  row.append(bookImage);
  row.append(bookDetails);
  row.append(bookPrice);
  row.append(bookQuantity);
  row.append(bookRemoval);
  row.append(bookTotalPrice);
  bookImage.append(img);
  bookDetails.append(bookDetailsTitle);
  bookDetails.append(bookDetailsAuthor);
  bookQuantity.append(bookQuantityInput);
  bookRemoval.append(bookRemovalBtn);

  // add attributes
  row.className = "row cart-row";
  bookImage.className = "book-image";
  img.src = book.imageLink;

  bookDetails.className = "book-details";
  bookDetailsTitle.innerHTML = book.title;
  bookDetailsAuthor.innerHTML = book.author;

  bookPrice.className = "book-price";
  bookPrice.innerHTML = `${book.price}$`;

  bookQuantity.className = "book-quantity";
  bookQuantityInput.type = "number";
  bookQuantityInput.value = item.quantity;
  bookQuantityInput.min = "1";

  bookRemoval.className = "book-removal";
  bookRemovalBtn.className = "btn btn-sm btn-danger";
  bookRemovalBtn.innerHTML = "X";

  bookTotalPrice.className = "book-total-price";
  bookTotalPrice.innerHTML = `${+book.price * +item.quantity}$`;

  // add event handler
  bookRemovalBtn.onclick = () => {
    removeCartItem(book);
  };

  bookQuantityInput.onchange = () => {
    console.log("fire!");
    // recalculate total per item
    bookTotalPrice.innerHTML = +book.price * +bookQuantityInput.value;
    let cart = getCart();
    // store value
    cart.set(book.title, {
      book: item.book,
      quantity: bookQuantityInput.value,
    });
    setCart(cart);
    // calc grand total
    calculateTotalPrice(cart);
  };

  return row;
}

// remove 1 item from cart
function removeCartItem(book) {
  let cart = getCart();
  cart.delete(book.title);

  setCart(cart);
  // update the displayed cart
  displayCart();
}

// Clear all cart items //
// function clearCart() {
//   // clear the cart in localStorage
//   localStorage.removeItem("cart");

//   displayCart();
// }

// display the cart on page load
displayCart();

// event listener clear cart button
// document.querySelector("#clear-cart-button").onclick = clearCart;
