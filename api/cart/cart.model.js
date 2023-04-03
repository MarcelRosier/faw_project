let carts = {};

export function getCartModel(email) {
  return carts[email] || new Map();
}

export function setCartModel(email, cart) {
  carts[email] = cart;
}

export function addToCartModel(email, item) {
  let cart = getCart(email);
  let existingCartItem = cart.get(item.title);
  cart.set(item.title, {
    book: item,
    quantity:
      existingCartItem === undefined ? 1 : +existingCartItem.quantity + 1,
  });
  setCart(email, cart);
}

export function removeCartItemModel(email, title) {
  let cart = getCart(email);
  cart.delete(title);
  setCart(email, cart);
}
