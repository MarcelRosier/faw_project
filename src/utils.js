function register() {
  login_form = document.getElementById("register_form");
  if (!login_form.checkValidity()) {
    return;
  }

  // get values
  email = document.getElementById("email_input").value;
  pw = document.getElementById("password_input").value;
  firstName = document.getElementById("first_name_input").value;
  lastName = document.getElementById("last_name_input").value;

  // persist user
  user = {
    email: email,
    password: pw,
    firstName: firstName,
    lastName: lastName,
  };
  addUser(user);

  // set current user as active
  setActiveUser(user);
}

function login(event) {
  login_form = document.getElementById("login_form");
  if (!login_form.checkValidity()) {
    return;
  }

  // get values
  email_element = document.getElementById("email_input");
  pw_element = document.getElementById("password_input");
  error_element = document.getElementById("login_error_p");

  // check if access data is valid
  user_db = getUsers();
  user = user_db.get(email_element.value);

  if (user === undefined) {
    event.preventDefault();
    error_element.hidden = false;
    return;
  }
  // check pw
  if (user.password !== pw_element.value) {
    event.preventDefault();
    error_element.hidden = false;
    return;
  }

  // set current user as active
  setActiveUser(user);
}

function setActiveUser(user) {
  if (user === undefined) {
    // = logout
    localStorage.removeItem("active_user");
  } else {
    localStorage.active_user = JSON.stringify(user);
  }
}

function getActiveUser() {
  return localStorage.active_user == undefined
    ? undefined
    : JSON.parse(localStorage.active_user);
}

function mapToString(map) {
  return JSON.stringify(Array.from(map.entries()));
}
function stringToMap(str) {
  return new Map(JSON.parse(str));
}
function addUser(user) {
  // add user to db
  user_db = getUsers();
  user_db.set(user.email, user);
  localStorage.user_db = mapToString(user_db);
}

function getUsers() {
  return localStorage.user_db == undefined
    ? new Map()
    : stringToMap(localStorage.user_db);
}
