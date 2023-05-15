import React, { useContext } from "react";
import { message } from "react-message-popup";
import validator from "validator";
import { API_HOST } from "../../constants";
import { CurrentUserContext } from "../../App";
import { NavLink, useNavigate } from "react-router-dom";

interface LoginFormData {
  email: string;
  password: string;
}
interface LoginFormErrors {
  email?: string;
  password?: string;
}

async function login(userData: LoginFormData) {
  try {
    const response = await fetch(`${API_HOST}/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    return response.ok ? response.json() : undefined;
  } catch (error) {
    message.error(`Error while attempting user login: ${error}`, 2500);
  }
}

export const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(CurrentUserContext);
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
  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // validate email and password
    if (errors.email || errors.password || !state.email || !state.password) {
      // event.preventDefault();
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
    let user = await login(state);
    if (!user) {
      // event.preventDefault();
      message.error(`Invalid email or password!`, 2000);
      return;
    }
    // update userContext
    setUser(user);
    // store userId in sessionStorage
    sessionStorage.setItem("userId", user.id);
    navigate("/shop");
    message.success(`Welcome back ${user.firstName}`, 4000);
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
              Not a member? <NavLink to="/register">Register</NavLink>
            </p>
          </div>
        </form>
      </section>
    </section>
  );
};
