import { read, write } from './cart.model.js';
import { fetchProductById } from '../products/products.controller.js';

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
