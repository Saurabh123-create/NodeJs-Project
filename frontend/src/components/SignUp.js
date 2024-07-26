import React, { useState } from "react";
import SignCss from "./signup.module.css";
export default function SignUp() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleInputs(val, name) {
    setData((prev) => {
      return { ...prev, [name]: val };
    });
  }

  function submitData(e){
    e.preventDefault()
    console.log(data)
  }

  return (
    <div className={SignCss.signup}>
      <h4 style={{ textAlign: "center" }}>Sign Up</h4>
      <form onSubmit={submitData}>
        <div className={SignCss.form}>
          <div>
            <label for="name">Name</label>
            <input
              id="name"
              className={SignCss.signupText}
              type="text"
              placeholder="Name"
              value={data.username}
              onChange={(e) => {
                handleInputs(e.target.value, "username");
              }}
            />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              id="email"
              className={SignCss.signupText}
              type="email"
              placeholder="Email"
              value={data.email}
              onChange={(e) => {
                handleInputs(e.target.value, "email");
              }}
            />
          </div>
          <div>
            <label for="pass">Password</label>
            <input
              id="pass"
              className={SignCss.signupText}
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => {
                handleInputs(e.target.value, "password");
              }}
            />
          </div>
          <input type="submit" value={"Sign-Up"} />
        </div>
      </form>
    </div>
  );
}
