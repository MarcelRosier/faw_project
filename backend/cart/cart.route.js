import express from "express";
import {
  addProduct,
  removeProduct,
  getCart,
  getCarts,
  updateCarts,
} from "./cart.controller.js";

export const cartRouter = express.Router();

cartRouter.post("/carts", addProduct);
cartRouter.get("/carts", getCarts);
cartRouter.put("/carts", updateCarts);
cartRouter.delete("/carts/:id", removeProduct);
cartRouter.get("/carts/:id", getCart);

export default cartRouter;
