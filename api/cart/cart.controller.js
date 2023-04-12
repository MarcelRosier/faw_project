import { read, write } from './cart.model.js';
import { fetchProductById } from '../products/products.controller.js';

export async function addProduct(req, res) {
  const userId = req.params.userId;
  const { productId } = req.body;

  try {
    const product = await fetchProductById(productId);

    read((err, carts) => {
      if (err) {
        return res.status(500).send('error reading cart');
      }

      if (!carts[userId]) {
        carts[userId] = [];
      }

    const existingCartItemIndex = carts[userId].findIndex(item => item.productId === product.id);

      if (existingCartItemIndex !== -1) {
        carts[userId][existingCartItemIndex].quantity += 1;
      } else {
        const cartItem = {
          productId: product.id,
          quantity: 1,
        };
        carts[userId].push(cartItem);
      }

      write(carts, (err) => {
        if (err) {
          return res.status(500).send('Error adding to cart');
        }

        res.status(201).send('product added to cart');
      });
    });
  } catch (error) {
    res.status(500).send('Error getting product');
  }
}

export function removeProduct(req, res) {
  const userId = req.params.userId;
  const { productId } = req.body;

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart');
    }

    if (!carts[userId]) {
      return res.status(404).send('cart not found for user');
    }

    const productIndex = carts[userId].findIndex(item => item.productId === productId);
    if (productIndex === -1) {
      return res.status(404).send('Product not found in cart');
    }

    carts[userId].splice(productIndex, 1);
    write(carts, (err) => {
      if (err) {
        return res.status(500).send('error adding to cart');
      }

      res.status(200).send('product removed from cart');
    });
  });
}

export function getCart(req, res) {
  const userId = req.params.userId;

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart');
    }

    const cart = carts[userId];

    if (!cart) {
      return res.status(404).send('Cart not found for this user');
    }

    res.status(200).json(cart);
  });
}