import express from 'express';
import {
   addProduct,
   removeProduct,
   getCart
  } from './cart.controller.js';

export const cartRouter = express.Router();

cartRouter.post('/cart/:cartId', addProduct);
cartRouter.delete('/cart/:cartId', removeProduct);
cartRouter.get('/cart/:cartId', getCart);

export default cartRouter;

