import express from "express";
import {
  getallusers,
  getuserinfo,
  insertuserdetails,
  updateuserinfo,
  deleteuser,
} from "./users.controller.js";

export const userRouter = express.Router();

// const for handling the router
userRouter.use(express.json());

//define the routes

//route to get all the users information
userRouter.get("/users", getallusers);
// route to get specific user information with ID
userRouter.get("/users/:id", getuserinfo);

//route to add the users information
userRouter.post("/users", insertuserdetails);

// route to update user information
userRouter.put("/users/:id", updateuserinfo);

//route to delete specific user information
userRouter.delete("/users/:id", deleteuser);
