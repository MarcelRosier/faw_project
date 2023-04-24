import * as productModel from "./products.model.js";

export async function getProducts(req, res) {
  try {
    res.json(await productModel.getProducts());
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getFeaturedProducts(req, res) {
  try {
    res.json(await productModel.getFeaturedProducts());
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function getProductCategories(req, res) {
  try {
    res.json(await productModel.getProductCategories());
  } catch (error) {
    res.sendStatus(500);
  }
}
export async function getProductById(req, res) {
  try {
    let id = parseInt(req.params.id);
    let product = await productModel.getProductById(id);
    if (product !== undefined) {
      res.json(product);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function fetchProductById(id) {
  return await productModel.getProductById(id);
}

export async function getProductsByCategory(req, res) {
  try {
    let products = await productModel.getProductsByCategory(
      req.params.category
    );
    res.json(products);
  } catch (error) {
    res.sendStatus(500);
  }
}
