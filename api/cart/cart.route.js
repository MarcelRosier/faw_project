import express from "express";
import {
  getCart,
  setCart,
  addToCart,
  removeCartItem
} from "./cart.controller.js";

export const cartRouter = express.Router();

/* GET route with the path '/:email'. When GET request is made to this path the 'getCart' function from the cart.controller.js will be called */
cartRouter.get('/:email', getCart);

cartRouter.post('/:email', setCart);

cartRouter.post('/:email/add', addToCart);
/* DELETE route with path '/:email/remove/:title'. ':title' parameter is the title of the item to be removed */
cartRouter.delete('/:email/remove/:title', removeCartItem);
