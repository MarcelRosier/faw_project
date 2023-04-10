import * as usermodel from "./users.model.js";

// APi to fetch the details of users from json data
export async function getallusers(req, res) {
  try {
    let allusers = await usermodel.getAll();
    res.json(allusers);
  } catch (error) {
    res.status(500).send(error.message);
  }
}

// Api to insert the users in json database
export async function insertuserdetails(req, res) {
  try {
    let addnewuser = req.body;
    await usermodel.add(addnewuser);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// API endpoint to fetch specific user information
export async function getuserinfo(req, res) {
  try {
    let id = parseInt(req.params.id);
    let user = await usermodel.getByuserID(id);
    res.json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
}

// API endpoint to update user information
export async function updateuserinfo(req, res) {
  try {
    let id = parseInt(req.params.id);
    let user = req.body;
    await usermodel.update(id, user);
    res.end();
  } catch (error) {
    res.status(400).send(error.message);
  }
}

// API endpoint to delete specific user information
export async function deleteuser(req, res) {
  try {
    let id = parseInt(req.params.id);
    await usermodel.remove(id);
    res.end();
  } catch (error) {
    res.status(500).send(error.message);
  }
}
