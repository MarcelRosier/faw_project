import express from "express";
import {
  getAllUsers,
  getUserInfo,
  insertUserDetails,
  updateUserInfo,
  deleteUser,
  login,
} from "./users.controller.js";

export const userRouter = express.Router();

// const for handling the router
userRouter.use(express.json());

//define the routes

//route to get all the users information
userRouter.post("/login", login);
userRouter.get("/users", getAllUsers);
// route to get specific user information with ID
userRouter.get("/users/:id", getUserInfo);

//route to add the users information
userRouter.post("/users", insertUserDetails);

// route to update user information
userRouter.put("/users/:id", updateUserInfo);

//route to delete specific user information
userRouter.delete("/users/:id", deleteUser);
