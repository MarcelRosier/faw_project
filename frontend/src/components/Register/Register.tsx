import React, { useContext } from "react";
import { message } from "react-message-popup";
import validator from "validator";
import { API_HOST } from "../../constants";
import { ShopContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
}

async function register(userData: RegisterFormData) {
  try {
    const response = await fetch(`${API_HOST}/users`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
      }),
    });
    return response;
  } catch (error) {
    message.error(`Error while attempting user sign up: ${error}`, 2500);
  }
}

export const Register = () => {
  const navigate = useNavigate();
  const { user, setUser, cart, setCart } = useContext(ShopContext);
  const [state, setState] = React.useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = React.useState<RegisterFormErrors>({});
  const validateEmail = (email: string) => {
    return validator.isEmail(email) ? undefined : "Invalid email";
  };
  const validatePassword = (password: string) => {
    return password.length > 0 ? undefined : "Password field can not be empty";
  };
  const validateName = (name: string) => {
    return validator.isAlpha(name) ? undefined : "Invalid name";
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ firstName: event.target.value } }));
    setErrors((prev) => ({
      ...prev,
      ...{ firstName: validateName(event.target.value) },
    }));
  };
  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, ...{ lastName: event.target.value } }));
    setErrors((prev) => ({
      ...prev,
      ...{ lastName: validateName(event.target.value) },
    }));
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
      ...{
        password: validatePassword(event.target.value),
        passwordConfirmation: validatePassword(event.target.value),
      },
    }));
  };

  const handlePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setState((prev) => ({
      ...prev,
      ...{ passwordConfirmation: event.target.value },
    }));
    setErrors((prev) => ({
      ...prev,
      ...{
        password: validatePassword(event.target.value),
        passwordConfirmation: validatePassword(event.target.value),
      },
    }));
  };
  const anyEmptyFields = () => {
    return Object.values(state).some((field) => field === "");
  };
  const anyErrors = () => {
    return Object.values(errors).some((field) => field !== undefined);
  };

  const handleCancel = () => {
    navigate("/shop");
  };
  const handleRegister = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // validate email and password
    if (anyErrors() || anyEmptyFields()) {
      setErrors((prev) => ({
        ...prev,
        ...{
          firstName: validateName(state.firstName),
          lastName: validateName(state.lastName),
          email: validateEmail(state.email),
          password: validatePassword(state.password),
          passwordConfirmation: validatePassword(state.passwordConfirmation),
        },
      }));

      return;
    }

    // check passwords match
    if (state.password !== state.passwordConfirmation) {
      let errorMsg = "Passwords do not match";
      setErrors((prev) => ({
        ...prev,
        ...{
          password: errorMsg,
          passwordConfirmation: errorMsg,
        },
      }));
      return;
    }

    // create user
    let userResponse = await register(state);
    if (!userResponse) {
      message.error("Unknown Error");
      return;
    }
    if (!userResponse.ok) {
      // event.preventDefault();
      message.error(`Email address is already in use!`, 2000);
      return;
    }
    let user = await userResponse.json();
    // update userContext
    setUser(user);
    // store userId in sessionStorage
    sessionStorage.setItem("userId", user.id);
    navigate("/shop");
    message.success(`Welcome ${user.firstName}`, 4000);
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
        <h5>Sign up for a free account</h5>
        <form noValidate action="">
          <div className="form-row">
            <div className="col mb-4">
              <input
                type="text"
                id="first_name_input"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                onChange={handleFirstName}
                required
              />
              <div className="invalid-feedback">Invalid first name!</div>
              <label className="form-label" htmlFor="first_name_label">
                First Name
              </label>
            </div>
            <div className="col mb-4">
              <input
                type="text"
                id="last_name_input"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                onChange={handleLastName}
                required
              />
              <div className="invalid-feedback">Invalid last name!</div>
              <label className="form-label" htmlFor="last_name_label">
                Last Name
              </label>
            </div>
          </div>
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
            <div className="invalid-feedback">{errors.password}</div>
            <label className="form-label" htmlFor="password_label">
              Password
            </label>
          </div>
          <div className="form-outline mb-4">
            <input
              type="password"
              id="password_confirmation_input"
              className={`form-control ${
                errors.passwordConfirmation ? "is-invalid" : ""
              }`}
              onChange={handlePasswordConfirmation}
              required
            />
            <div className="invalid-feedback">
              {errors.passwordConfirmation}
            </div>
            <label className="form-label" htmlFor="password_label">
              Password Confirmation
            </label>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <button
              type="submit"
              className="btn btn-primary btn-block mb-4 w-50"
              onClick={handleRegister}
            >
              Sign up
            </button>
            <button
              type="submit"
              className="btn btn-danger btn-block mb-4"
              onClick={handleCancel}
              style={{ maxWidth: "10%" }}
            >
              X
            </button>
          </div>
        </form>
      </section>
    </section>
  );
};
