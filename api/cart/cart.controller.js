import { read, write, findProductIndex } from './cart.model.js';
import { fetchProductById } from '../products/products.controller.js';

/* Add product to cart with {cartId}*/
export async function addProduct(req, res) {
  const cartId = req.params.cartId;
  const { userId, productId } = req.body;

  try {
    const product = await fetchProductById(productId);

    read((err, carts) => {
      if (err) {
        return res.status(500).send('error reading cart');
      }

      // Check if cart exists, and create a new one if it doesn't
      let cart = carts[cartId];
      if (!cart || cart.userId !== userId) {
        cart = {
          userId: userId,
          items: [],
        };
        carts[cartId] = cart;
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


/* Delete product from cart with {cartId}*/
export function removeProduct(req, res) {
  const cartId = req.params.cartId;
  const { userId, productId } = req.body;

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart');
    }

    const cart = carts[cartId];

    if (!cart || cart.userId !== userId) {
      return res.status(404).send('cart not found for user');
    }

    const productIndex = findProductIndex(cart, productId);
    if (productIndex === -1) {
      return res.status(404).send('Product not found in cart');
    }

    cart.items.splice(productIndex, 1);
    write(carts, (err) => {
      if (err) {
        return res.status(500).send('error adding to cart');
      }

      res.status(200).send('product removed from cart');
    });
  });
}


/* Get cart with {cartId} */
export function getCart(req, res) {
  const cartId = req.params.cartId;

  read((err, carts) => {
    if (err) {
      return res.status(500).send('Error reading cart');
    }

    const cart = carts[cartId];

    if (!cart) {
      return res.status(404).send('Cart not found for this user');
    }

    res.status(200).json(cart);
  });
}
