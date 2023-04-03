import express from "express";
import {getAllusersdetails,getUseridinfo,insertUserdetails,updateUserinfo,deleteUserinfo} from "./users.controller.js";

export const userRouter = express.Router();

// const for handling the router
userRouter.use(express.json());

//define the routes

//route to get all the users information
userRouter.get("/users", getAllusersdetails);
// route to get specific user information with ID
userRouter.get("/users/:id", getUseridinfo);

//route to add the users information
userRouter.post("/users", insertUserdetails);

// route to update user information
userRouter.put("/users/:id", updateUserinfo);

//route to delete specific user information
userRouter.delete("/users/:id", deleteUserinfo);

