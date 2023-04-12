import * as fs from "fs/promises";
const USERS_DATA = "api/users/users.json";

// return all users from file
export async function getAll() {
  try {
    let userTxt = await fs.readFile(USERS_DATA);
    let users = JSON.parse(userTxt);
    return users;
  } catch (err) {
    if (err.code === "ENOENT") {
      await save([]); // if no file exists create a new file with ampty array
      return []; // return empty array
    } // // cannot handle this exception, so rethrow
    else throw err;
  }
}

// save the users in user.json file
async function save(users = []) {
  let usersTXT = JSON.stringify(users);
  await fs.writeFile(USERS_DATA, usersTXT);
}

// test function for finding userid exists or not
function findCustomer(userArray, Id) {
  return userArray.findIndex((currCustomer) => currCustomer.id === Id);
}

// Post operation to save user details into file
export async function add(newuser) {
  let userArray = await getAll();
  if (findCustomer(userArray, newuser.id) !== -1)
    throw new Error(`user with Id:${newuser.id} already exists`);
  userArray.push(newuser);
  await save(userArray);
}

//get operation for fetching specific userdetails
export async function getByuserID(userid) {
  let users = await getAll();
  let index = findCustomer(users, userid);
  if (index === -1) throw new Error(`user with ID:${userid} doesn't exist`);
  else return users[index];
}

// PUT Request -update existing customer
export async function update(userId, user) {
  let usersArray = await getAll();
  let index = findCustomer(usersArray, userId); // find the user
  if (index === -1) throw new Error(`user with ID:${userId} doesn't exist`);
  else {
    usersArray[index] = user;
    await save(usersArray);
  }
}

// delete existing customer
export async function remove(userId) {
  let usersArray = await getAll();
  let index = findCustomer(usersArray, userId); // find specific user with ID
  if (index === -1) throw new Error(`user with ID:${userId} doesn't exist`);
  else {
    usersArray.splice(index, 1); // remove user from array
    await save(usersArray);
  }
}
