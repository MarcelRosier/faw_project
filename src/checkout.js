function displayCart() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  let cartTableBody = document.querySelector("#cart-table tbody");
  cartTableBody.innerHTML = "";

  // add a row for each cart item
  cart.forEach(function (item, index) {
  // console.log("item:", item); //
    let row = cartTableBody.insertRow();
    row.insertCell().textContent = item.title;
    row.insertCell().textContent = item.author;
    row.insertCell().textContent = item.price;
    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.onclick = function () {
      removeCartItem(index);
    };
    row.insertCell().appendChild(removeButton);
  });
}

// remove 1 item from cart
function removeCartItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  cart.splice(index, 1);

  // save the updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // update the displayed cart
  displayCart();
}

// Clear all cart items //
function clearCart() {
  // clear the cart in localStorage
  localStorage.removeItem("cart");

  displayCart();
}

// display the cart on page load
displayCart();

// event listener clear cart button
document.querySelector("#clear-cart-button").onclick = clearCart;
