import {
  read,
  write,
  addProductToCart,
  removeProductFromCart,
  getCartById,
  getCartByUserId,
  updateCartByUserId,
} from "./cart.model.js";
import { fetchProductById } from "../products/products.controller.js";

/* Add product to cart*/
export async function addProduct(req, res) {
  const { userId, productId } = req.body;

  try {
    const product = await fetchProductById(productId);

    read(async (err, carts) => {
      if (err) {
        return res.status(500).send("error reading cart");
      }

      try {
        const updatedCarts = await addProductToCart(carts, userId, product);
        write(updatedCarts, (err) => {
          if (err) {
            return res.status(500).send("Error adding to cart");
          }

          res.status(201).send("product added to cart");
        });
      } catch (error) {
        res.status(404).send(error.message);
      }
    });
  } catch (error) {
    res.status(400).send("Error getting product");
  }
}

/* Delete product from cart */
export function removeProduct(req, res) {
  let cartId = parseInt(req.params.id);
  const { userId, productId } = req.body;

  read((err, carts) => {
    if (err) {
      return res.status(500).send("Error reading cart");
    }

    try {
      const updatedCarts = removeProductFromCart(
        carts,
        cartId,
        userId,
        productId
      );
      write(updatedCarts, (err) => {
        if (err) {
          return res.status(500).send("error removing from cart");
        }

        res.status(200).send("product removed from cart");
      });
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
}

/* Get cart */
export function getCart(req, res) {
  let cartId = parseInt(req.params.id);

  read((err, carts) => {
    if (err) {
      return res.status(400).send("Error reading cart");
    }

    try {
      const cart = getCartById(carts, cartId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
}
/* Get cart */
export function getCarts(req, res) {
  let userId = parseInt(req.query.userId);
  if (!userId) {
    return res.status(400).send("userId is required");
  }
  read((err, carts) => {
    if (err) {
      return res.status(400).send("Error reading cart");
    }

    try {
      const cart = getCartByUserId(carts, userId);
      res.status(200).json(cart);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
}

export function updateCarts(req, res) {
  const { userId, cartItems } = req.body;
  if (!userId) {
    return res.status(400).send("userId is required");
  }
  write((err, carts) => {
    if (err) {
      return res.status(400).send("Error reading cart");
    }

    try {
      const updatedCart = updateCartByUserId(carts, userId, cartItems);
      res.status(200).json(updatedCart);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });
}
