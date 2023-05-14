import * as userModel from "./users.model.js";

// APi to fetch the details of users from json data
export async function getAllUsers(req, res) {
  try {
    let allusers = await userModel.getAll();
    res.json(allusers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
// APi to login a user
export async function login(req, res) {
  try {
    let user = req.body;
    let existingUser = await userModel.userExists(user.email, user.password);
    if (existingUser) {
      res.json(existingUser);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Api to insert the users in json database
export async function insertUserDetails(req, res) {
  try {
    let addnewuser = req.body;
    let user = await userModel.add(addnewuser);
    res.json(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// API endpoint to fetch specific user information
export async function getUserInfo(req, res) {
  try {
    let id = parseInt(req.params.id);
    let user = await userModel.getByuserID(id);
    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// API endpoint to update user information
export async function updateUserInfo(req, res) {
  try {
    let id = parseInt(req.params.id);
    let user = req.body;
    await userModel.update(id, user);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// API endpoint to delete specific user information
export async function deleteUser(req, res) {
  try {
    let id = parseInt(req.params.id);
    await userModel.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
