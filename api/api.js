import express from "express";
import bodyParser from 'body-parser';
import { productRouter } from "./products/products.route.js";
import { cartRouter } from "./cart/cart.route.js"

// import { customerRouter } from "./customers/customer.route.js";
const app = express();
const PORT = 3000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

app.use(productRouter);
app.use(bodyParser.json());
app.use(cartRouter);

app.get("/", (req, res) => res.send("Index page, Hello there!"));

// For invalid routes
app.get("*", (req, res) => {
  res.send("404! This is an invalid URL.");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in server setup: ${err}`);
  }
  console.log("Server listening on Port", PORT);
});
