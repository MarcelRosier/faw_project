import express from "express";
import {
  getProducts,
  getProductById,
  getProductCategories,
  getProductsByCategory,
  getFeaturedProducts,
} from "./products.controller.js";

export const productRouter = express.Router();

// middleware specific to this route
productRouter.use(express.json());

// route handlers
productRouter.get("/products", getProducts);
productRouter.get("/products/featured", getFeaturedProducts);

productRouter.get("/products/categories", getProductCategories);
// productRouter.get("/products/categories/:category", getProductsByCategory);

productRouter.get("/products/:id", getProductById);
