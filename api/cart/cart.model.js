import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const cartFile = path.join(__dirname, "cart.json");

export function read(callback) {
  fs.readFile(cartFile, (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, JSON.parse(data));
  });
}

export function write(carts, callback) {
  fs.writeFile(cartFile, JSON.stringify(carts), (err) => {
    if (err) {
      return callback(err);
    }
    callback(null);
  });
}

export function findProductIndex(cart, productId) {
  return cart.items.findIndex((item) => item.productId === productId);
}

export async function addProductToCart(carts, userId, product) {
  let cart = carts.find((cart) => cart.userId === userId);
  console.log(cart);
  if (!cart) {
    cart = {
      userId,
      items: [],
    };
    carts.push(cart);
  }
  console.log(cart);
  if (cart.userId !== userId) {
    throw new Error("Cart not found for user");
  }

  const existingCartItemIndex = findProductIndex(cart, product.id);

  if (existingCartItemIndex !== -1) {
    cart.items[existingCartItemIndex].quantity += 1;
  } else {
    const cartItem = {
      productId: product.id,
      quantity: 1,
    };
    cart.items.push(cartItem);
  }

  return carts;
}

export function removeProductFromCart(carts, cartId, userId, productId) {
  const cart = carts.find((cart) => cart.id === cartId);

  if (!cart || cart.userId !== userId) {
    throw new Error("Cart does not belong to given user");
  }

  const productIndex = findProductIndex(cart, productId);
  if (productIndex === -1) {
    throw new Error("Product not found in cart");
  }

  cart.items.splice(productIndex, 1);
  return carts;
}

export function getCartById(carts, cartId) {
  const cart = carts.find((cart) => cart.id === cartId);
  if (!cart) {
    throw new Error("Cart not found for this user");
  }
  return cart;
}

export function getCartByUserId(carts, userId) {
  let cart = carts.find((cart) => cart.userId === userId);

  if (!cart) {
    throw new Error("Cart not found for this user");
  }
  return cart;
}

export function updateCartByUserId(carts, userId, cartItems) {
  let cart = carts.find((cart) => cart.userId === userId);

  if (!cart) {
    throw new Error("Cart not found for this user");
  }
  cart.items = cartItems;
  return cart;
}

export default { read, write };
