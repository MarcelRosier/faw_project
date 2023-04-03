import express from "express";
import { productRouter } from "./products/products.route.js";
import { userRouter } from "./users/users.route.js";

const app = express();
const PORT = 3000;

// This is a built-in middleware function in Express. It parses incoming requests with JSON payloads.
app.use(express.json());

app.use(productRouter);
app.use(userRouter);

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

app.get("/users/:id", (req, res) => {
  res.send(req.params);
});

app.post("/users/:id", (req, res) => {
  res.send(`{
    "parameters": ${JSON.stringify(req.params)}
    "body":${JSON.stringify(req.body) }
}`);
});