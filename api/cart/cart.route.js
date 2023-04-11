import express from 'express';
import {
  createCart,
   addProduct,
   removeProduct,
   getCart
  } from './cart.controller.js';

export const router = express.Router();

router.post('/cart/:userId', createCart);
router.post('/cart/:userId/:productId', addProduct);
router.delete('/cart/:userId/:productId', removeProduct);
router.get('/cart/:userId', getCart);

export default router;

