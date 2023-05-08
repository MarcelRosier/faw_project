import React from 'react'
import { Link } from 'react-router-dom'


export const Login = () => {

  return (
<>
<section className="container w-80">
      <h3 className="display-3 my-4" style={{textAlign: "center"}}>
        The largest community of book enthusiasts
      </h3>
      <section className="container" style={{marginTop: 10, maxWidth: 400, margin: 0}}>
        <h5>Login</h5>
        <form id="login_form" action="/src/shop.html">
          <div className="form-outline mb-4">
            <input
              type="email"
              id="email_input"
              className="form-control"
              required
            />
            <div className="invalid-feedback">Incorrect password or unkown email</div>
            <label className="form-label" htmlFor="email_label">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="password_input"
              className="form-control"
              required
            />
            <div className="invalid-feedback">Incorrect password or unkown email</div>
            <label className="form-label" htmlFor="password_label">Password</label>
          </div>
          <div className="d-flex align-items-center justify-content-center">

            <button
            type="submit"
            className="btn btn-primary btn-block mb-4 w-50"
            onClick="login(event)"
            >
            Log in
            </button>
          </div>
            

            <div className="text-center">
              <p>Not a member? <Link to="/register">Register</Link></p>
            </div>
        </form>
      </section>
    </section>
    </> 
  )
}

//<p>Not a member? Register</p>