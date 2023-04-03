import {
    getCartModel,
    setCartModel,
    addToCartModel,
    removeCartItemModel,
  } from "./cart.model.js";
  
  export async function getCart(req, res) {
    try {
      const { email } = req.params;
      const cart = await getCartModel(email);
      res.status(200).json(cart);
    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  export async function setCart(req, res) {
    try {
/*    extracts the email property from the request parameters */
      const { email } = req.params;
      const { cart } = req.body;
/*    Calling setCartModel from cart.model.js with email and cart variables as argument */
      await setCartModel(email, cart);
      res.status(200).json({ message: "Cart saved" });
    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  export async function addToCart(req, res) {
    try {
      const { email } = req.params;
      const { item } = req.body;
      await addToCartModel(email, item);
      res.status(200).json({ message: "Product added to cart" });
    } catch (error) {
      res.sendStatus(500);
    }
  }
  
  export async function removeCartItem(req, res) {
    try {
      const { email, title } = req.params;
      await removeCartItemModel(email, title);
      res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
      res.sendStatus(500);
    }
  }
  