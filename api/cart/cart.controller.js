import { read, write } from './cart.model.js';
import { fetchProductById } from '../products/products.controller.js';


/* Create cart for {userId} */
export function createCart(req, res) {
  const userId = req.params.userId;

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart file');
    }

    if (carts[userId]) {
      return res.status(400).send('Cart already exists for this user');
    }

    carts[userId] = [];
    write(carts, (err) => {
      if (err) {
        return res.status(500).send('Error writing to cart file');
      }

      res.status(201).send('Cart created');
    });
  });
}

/* Add product to cart with {userId} */
export async function addProduct(req, res) {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);

  try {
    const product = await fetchProductById(productId);

    if (!product) {
      return res.status(404).send('Product not found');
    }

    read((err, carts) => {
      if (err) {
        return res.status(500).send('Error reading cart file');
      }

      if (!carts[userId]) {
        return res.status(404).send('Cart not found for this user');
      }

      const productIndex = carts[userId].findIndex((item) => item.id === product.id);

      if (productIndex !== -1) {
        return res.status(400).send('Product already in cart');
      }

      carts[userId].push(product);
      write(carts, (err) => {
        if (err) {
          return res.status(500).send('Error writing to cart file');
        }

        res.status(201).send('Product added to cart');
      });
    });
  } catch (error) {
    res.status(500).send('Error adding product to cart');
  }
}

/* Delete product from cart with {userId} */
export function removeProduct(req, res) {
  const userId = req.params.userId;
  const productId = parseInt(req.params.productId);

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart file');
    }

    if (!carts[userId]) {
      return res.status(404).send('Cart not found for this user');
    }

    const productIndex = carts[userId].findIndex((item) => item.id === productId);

    if (productIndex === -1) {
      return res.status(404).send('Product not found in cart');
    }

    carts[userId].splice(productIndex, 1);
    write(carts, (err) => {
      if (err) {
        return res.status(500).send('Error writing to cart file');
      }

      res.status(200).send('Product removed from cart');
    });
  });
}

/* Get cart with {userId} */
export function getCart(req, res) {
  const userId = req.params.userId;

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart file');
    }

    const cart = carts[userId];

    if (!cart) {
      return res.status(404).send('Cart not found for this user');
    }

    res.status(200).json(cart);
  });
}