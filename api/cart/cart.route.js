import express from "express";
import { addProduct, removeProduct, getCart } from "./cart.controller.js";

export const cartRouter = express.Router();

cartRouter.post("/carts", addProduct);
cartRouter.delete("/carts/:id", removeProduct);
cartRouter.get("/carts/:id", getCart);

export default cartRouter;
