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

function findUserByEmail(userArray, email) {
  return userArray.findIndex((currCustomer) => currCustomer.email === email);
}

// Post operation to save user details into file
export async function add(newUser) {
  let userArray = await getAll();
  if (findUserByEmail(userArray, newUser.email) !== -1)
    throw new Error(`user with Email:${newUser.email} already exists`);
  let maxId = userArray.reduce(
    (max, user) => (user.id > max ? user.id : max),
    0
  ); // find max id

  newUser.id = maxId + 1; // assign new id
  userArray.push(newUser);
  await save(userArray);
  return newUser;
}

export async function userExists(email, password) {
  let users = await getAll();
  let matchingUsers = users.filter(
    (user) => user.email === email && user.password === password
  );
  return matchingUsers.length === 1 ? matchingUsers[0] : undefined;
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
