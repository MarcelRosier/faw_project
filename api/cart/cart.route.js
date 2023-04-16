import express from 'express';
import { addProduct, removeProduct, getCart } from './cart.controller.js';

export const cartRouter = express.Router();

cartRouter.post('/carts', addProduct);
cartRouter.delete('/carts', removeProduct);
cartRouter.get('/carts', getCart);

export default cartRouter;

