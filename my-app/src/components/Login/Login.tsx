import { stat } from "fs";
import React from "react";
import { message } from "react-message-popup";
import validator from "validator";

// function login(event:) {
//   let login_form = document.getElementById("login_form");
//   if (!login_form.checkValidity()) {
//     return;
//   }

// // get values
// let email_element = document.getElementById("email_input");
// let pw_element = document.getElementById("password_input");
// let error_element = document.getElementById("login_error_p");

// // check if access data is valid
// let user_db = getUsers();
// let user = user_db.get(email_element.value);

// if (user === undefined) {
//   event.preventDefault();
//   email_element.setAttribute("class", "form-control is-invalid");
//   pw_element.setAttribute("class", "form-control is-invalid");
//   return;
// }
// // check pw
// if (user.password !== pw_element.value) {
//   event.preventDefault();
//   email_element.setAttribute("class", "form-control is-invalid");
//   pw_element.setAttribute("class", "form-control is-invalid");
//   return;
// }

// // set current user as active
// setActiveUser(user);
// }

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginFormErrors {
  email?: string;
  password?: string;
}

export const Login = () => {
  const [state, setState] = React.useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState<LoginFormErrors>({
    email: "",
    password: "",
  });
  const validateEmail = (email: string) => {
    return validator.isEmail(email) ? undefined : "Invalid email";
  };
  const validatePassword = (password: string) => {
    return password.length > 0 ? undefined : "Password can not be empty";
  };
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ email: event.target.value } }));
    setErrors((prev) => ({
      ...prev,
      ...{ email: validateEmail(event.target.value) },
    }));
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ password: event.target.value } }));
    setErrors((prev) => ({
      ...prev,
      ...{ password: validatePassword(event.target.value) },
    }));
  };
  const handleLogin = (event: React.MouseEvent<HTMLButtonElement>) => {
    // validate email and password
    if (errors.email || errors.password || !state.email || !state.password) {
      event.preventDefault();
      setErrors((prev) => ({
        ...prev,
        ...{ email: validateEmail(state.email) },
      }));
      setErrors((prev) => ({
        ...prev,
        ...{ password: validatePassword(state.password) },
      }));
      message.error(`Please enter a valid email and password!`, 2000);
      return;
    }

    // check if user with email password combination exists

    //TODO
    message.info("Login successful!", 2000);
  };

  return (
    <section className="container w-80">
      <h3 className="display-3 my-4" style={{ textAlign: "center" }}>
        The largest community of book enthusiasts
      </h3>
      <section
        className="container"
        style={{ marginTop: "10%", maxWidth: "400px", margin: "0 auto" }}
      >
        <h5>Login</h5>
        <form noValidate action="">
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email_input"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              onChange={handleEmail}
              required
            />
            <div className="invalid-feedback">Invalid email</div>
            <label className="form-label" htmlFor="email_label">
              Email address
            </label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password_input"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              onChange={handlePassword}
              required
            />
            <div className="invalid-feedback">
              Password field can not be empty!
            </div>
            <label className="form-label" htmlFor="password_label">
              Password
            </label>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 w-50"
              onClick={handleLogin}
            >
              Log in
            </button>
          </div>

          <div className="text-center">
            <p>
              Not a member? <a href="/src/register.html">Register</a>
            </p>
          </div>
        </form>
      </section>
    </section>
  );
};
