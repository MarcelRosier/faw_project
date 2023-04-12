import express from 'express';
import {
   addProduct,
   removeProduct,
   getCart
  } from './cart.controller.js';

export const router = express.Router();

router.post('/cart/:userId', addProduct);
router.delete('/cart/:userId', removeProduct);
router.get('/cart/:userId', getCart);

export default router;

