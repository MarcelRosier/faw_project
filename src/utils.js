export function register(event) {
  let login_form = document.getElementById("register_form");
  if (!login_form.checkValidity()) {
    return;
  }

  // get values
  let email = document.getElementById("email_input").value;
  let pw_element = document.getElementById("password_input");
  let pw = pw_element.value;
  let pw_confirmation_element = document.getElementById(
    "password_confirm_input"
  );
  let pw_confirmation = pw_confirmation_element.value;
  let firstName = document.getElementById("first_name_input").value;
  let lastName = document.getElementById("last_name_input").value;

  if (pw !== pw_confirmation) {
    event.preventDefault();
    pw_element.setAttribute("class", "form-control is-invalid");
    pw_confirmation_element.setAttribute("class", "form-control is-invalid");
    return;
  }
  // persist user
  let user = {
    email: email,
    password: pw,
    firstName: firstName,
    lastName: lastName,
  };
  addUser(user);

  // set current user as active
  setActiveUser(user);
}

export function login(event) {
  let login_form = document.getElementById("login_form");
  if (!login_form.checkValidity()) {
    return;
  }

  // get values
  let email_element = document.getElementById("email_input");
  let pw_element = document.getElementById("password_input");
  let error_element = document.getElementById("login_error_p");

  // check if access data is valid
  let user_db = getUsers();
  let user = user_db.get(email_element.value);

  if (user === undefined) {
    event.preventDefault();
    email_element.setAttribute("class", "form-control is-invalid");
    pw_element.setAttribute("class", "form-control is-invalid");
    return;
  }
  // check pw
  if (user.password !== pw_element.value) {
    event.preventDefault();
    email_element.setAttribute("class", "form-control is-invalid");
    pw_element.setAttribute("class", "form-control is-invalid");
    return;
  }

  // set current user as active
  setActiveUser(user);
}

export function setActiveUser(user) {
  if (user === undefined) {
    // = logout
    localStorage.removeItem("active_user");
  } else {
    localStorage.active_user = JSON.stringify(user);
  }
}

export function getActiveUser() {
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
  let user_db = getUsers();
  user_db.set(user.email, user);
  localStorage.user_db = mapToString(user_db);
}

function getUsers() {
  return localStorage.user_db == undefined
    ? new Map()
    : stringToMap(localStorage.user_db);
}

export function getCart() {
  return localStorage.cart == undefined
    ? new Map()
    : stringToMap(localStorage.cart);
}
export function setCart(cart) {
  localStorage.cart = mapToString(cart);
}

export function addToCart(item) {
  let cart = getCart();
  console.log("cart before:", cart);
  // check if book is already in cart
  let existingCartItem = cart.get(item.title);
  cart.set(item.title, {
    book: item,
    quantity:
      existingCartItem === undefined ? 1 : +existingCartItem.quantity + 1,
  });

  localStorage.cart = mapToString(cart);
  console.log("cart after:", cart);
}

window.login = login;
window.register = register;
window.setActiveUser = setActiveUser;
