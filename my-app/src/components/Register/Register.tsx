import React, { ChangeEvent, useState } from "react";
import { Form } from "react-router-dom";
import { User } from "../../models/user.models";
import { API_HOST } from "../../constants";

export const Register = () => {
  const [firstName, setFirstname] = React.useState("");
  const onChangefirstName = (event: ChangeEvent<HTMLSelectElement>) => {
    setFirstname(event.target.value);
  };
  const [lastName, setLastname] = React.useState("");
  const onChangeLastName = (event: ChangeEvent<HTMLSelectElement>) => {
    setLastname(event.target.value);
  };
  const [email, setEmail] = React.useState("");
  const onChangeEmail = (event: ChangeEvent<HTMLSelectElement>) => {
    setEmail(event.target.value);
  };
  const [password, setPassword] = React.useState("");
  const onChangePassword = (event: ChangeEvent<HTMLSelectElement>) => {
    setPassword(event.target.value);
  };

  const [confirmPwd, setConfirmPwd] = React.useState("");
  const onChangeConfirmPwd = (event: ChangeEvent<HTMLSelectElement>) => {
    setConfirmPwd(event.target.value);
  };

const [passwordMatch, setPasswordsMatch]= useState<boolean>(true); 

const onSubmit=(event:React.FormEvent)=>{
  event.preventDefault();
  if(password!==confirmPwd){setPasswordsMatch(false);}
  else
  {
   
    //const response = await fetch(`${API_HOST}/users`, {

    //};

}
  console.log(firstName, lastName, password);
}
  return (
    <>
      <main className="container w-80">
        <h3 className="display-3 my-4" style={{ textAlign: "center" }}>
          The largest community of book enthusiasts
        </h3>
        <section
          className="mw-75 m-auto"
          style={{ marginTop: 10, maxWidth: 400, margin: 0 }}
        >
          <h5>Sign up for a free account</h5>
          <form onSubmit={onSubmit}>
            <div className="form-row">
              <div className="col-mb-4">
                <input
                  type="text"
                  id="first_name_label"
                  className="form-control"
                  onChange={onChangefirstName}
                  required
                />
                <label className="form-label" htmlFor="first_name_label">
                  First Name
                </label>
              </div>
              <div className="col mb-4">
                <input
                  type="text"
                  id="last_name_input"
                  className="form-control"
                  onChange={onChangeLastName}
                  required
                />
                <label className="form-label" htmlFor="last_name_label">
                  Last Name
                </label>
              </div>
            </div>
           
            <div className="form-outline mb-4">
              <input
                type="email"
                id="email_input"
                className="form-control"
                onChange={onChangeEmail}
                required
              />
              <label className="form-label" htmlFor="email_label">
                Email address
              </label>
            </div>
            
            <div className="form-outline mb-4">
              <input
                type="password"
                id="password_input"
                className="form-control"
                onChange={onChangePassword}
                required
              />
              {!passwordMatch && <p style={{color: "#dc3545"}}>Passwords do not match!</p>}
              <label className="form-label" htmlFor="password_label">
                Password
              </label>
             </div>
         
            <div className="form-outline mb-4">
              <input
                type="password"
                id="password_confirm_input"
                className="form-control"
                onChange={onChangeConfirmPwd}
                required
              />
             {!passwordMatch && <p style={{color: "#dc3545"}}>Passwords do not match!</p>}
              <label className="form-label" htmlFor="password_label">
                Confirm Password
              </label>
            </div>

            <div className="d-flex align-items-center justify-content-center">
              <button
                type="submit"
                className="btn btn-primary btn-block mb-4 w-50"
              >
                Sign up
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};
