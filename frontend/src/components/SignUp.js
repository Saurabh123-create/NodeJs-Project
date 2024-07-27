import React, { useState, useEffect } from "react";
import SignCss from "./signup.module.css";
import { useNavigate } from "react-router-dom";
export default function SignUp() {

    useEffect(()=>{
    let auth = localStorage.getItem("signup user")
    if(auth){
        navigate('/');
    }
    },[])

    const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [response, setResponse] = useState("")

  function handleInputs(val, name) {
    setData((prev) => {
      return { ...prev, [name]: val };
    });
  }
  
  async function submitData(e){
    e.preventDefault()
    let result = await fetch("http://localhost:3000/signup",{
        method : 'post',
        body : JSON.stringify(data),
        headers : {
            "Content-Type" : 'application/json',
        }
    })
    result = await result.json();
    if(result.status == 'success'){
        setResponse(result.msg);
        localStorage.setItem("signup user",JSON.stringify(data));
        navigate('/')
    }
    else if(result.status == 'failed'){
        setResponse(result.msg)
    }
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
          <div style={{color : 'green'}}>{response}</div>
        </div>
      </form>
    </div>
  );
}
