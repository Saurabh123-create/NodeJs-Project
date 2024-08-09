import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginCss from './login.module.css';

export default function Login() {
    const navigate = useNavigate()

    useEffect(()=>{
        let auth = localStorage.getItem("signup user")
        if(auth){
            navigate('/');
        }
    },[])
    const [data , setData] = useState({
        username : '',
        password : '',
    })

    async function handleSubmit(e){
        e.preventDefault();

        if(data.username == "" || data.password == ''){
            alert("Please enter all fields")
            return
        }

        let result = await fetch("http://localhost:3000/login" , {
            method : 'post',
            body : JSON.stringify(data),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        result = await result.json();
        if(result.status == "success"){
            alert("Login Successful");
            localStorage.setItem('signup user', JSON.stringify(result.data))
            localStorage.setItem('token', JSON.stringify(result.auth))
            navigate('/');
        }else if(result.status == "failed"){
            alert(result.msg)
        }
    }

    function handleInputs(val, name) {
        setData((prev) => {
          return { ...prev, [name]: val };
        });
      }

  return (
    <div style={{display : 'flex', flexDirection : 'row', height : '91vh'}}>
        <div className={LoginCss.img}></div>
        <div
      className={LoginCss.login}
    >

        <form onSubmit={handleSubmit}>
      <div
        style={{
          border: "1px solid gray",
          width: "500px",
          margin: "auto",
          padding: "20px",
          background : 'white'
        }}
      >
        <h2>Login Page</h2>
        <hr />
        <div>
          <label for="username" style={{ display: "block" , fontWeight : '400'}}>
            Name
          </label>
          <input
              type="text"
              id="username"
              value={data.username}
               onChange={(e) => {
                handleInputs(e.target.value, "username");
              }}
              placeholder="Enter Username"
              style={{
              width: "80%",
              margin: "10px 0px",
              padding: "5px 10px",
              borderRadius: "10px",
              border: "1px solid",
              fontSize: "16px",
            }}
          />
        </div>
        <div>
          <label for="username" style={{ display: "block" ,  fontWeight : '400'}}>
            Password
          </label>
          <input type="password" 
              id="username" 
              value={data.password}
              onChange={(e) => {
                handleInputs(e.target.value, "password");
              }}
              placeholder="Enter Password"
              style={{
              width: "80%",
              margin: "10px 0px",
              padding: "5px 10px",
              borderRadius: "10px",
              border: "1px solid",
              fontSize: "16px",
            }}/>
          <div style={{ margin: "20px 0px" }}>
            <button
              type="submit"
              style={{
                display: "block",
                width: "200px",
                padding: "10px",
                color: "white",
                background: "black",
                textAlign: "center",
                fontWeight : 'bold'
              }}
            >
              Submit
            </button>
          </div>
        </div>
      <Link to="/signup" >Sign Up</Link>
      </div>
      </form>
    </div>
    </div>

  );
}
