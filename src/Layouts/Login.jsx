

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [right, setRight] = useState("");
  const [opacity, setOpacity] = useState("");
  const [signUpBtn, setSignUpBtn] = useState(true);
  const [opacityLogin, setOpacityLogin] = useState("");

  const [hide, setHide] = useState("password");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://pott.website/api/login`, {
        email,
        password,
      });
      setEmail("");
      setPassword("");
      // console.log(response.data);
      localStorage.setItem("user_data", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`https://pott.website/api/register`, {
        name,
        email,
        password,
      });
      setName("");
      setEmail("");
      setPassword("");
      console.log(response.data)
      localStorage.setItem("user_data", JSON.stringify(response.data));
      navigate('/')
    } catch (error) {
      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setPassword("");
    }
  };

  const handleClick = () => {
    if (signUpBtn) {
      setRight("right");
      setOpacity("opacity-0");
      setSignUpBtn(false);
      setOpacityLogin("");
    } else {
      setRight("left");
      setSignUpBtn(true);
      setOpacity("");
      setOpacityLogin("opacity-0");
    }
  };

  console.log(name,email,password)


  return (
    <div className="wrapper-login-register">
      <div className="layer-1">
        <div
          className={`login-form flex flex-col gap-4 p-10 justify-center ${opacityLogin}`}
        >
          <input
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="p-2 bg-blue-500 rounded-lg text-white text-lg"
          >
            Sign In
          </button>
        </div>
        <div
          className={`register-form flex flex-col gap-4 p-10 justify-center ${opacity}`}
        >
          <input
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="email"
            placeholder="Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="password"
            placeholder="Password"
          />
          <button onClick={handleSignUp} className="p-2 bg-blue-500 rounded-lg text-white text-lg">
            Sign Up
          </button>
        </div>
      </div>

      <div className={`slide ${right} flex flex-col p-8`}>
        {signUpBtn ? (
          <div>
            <h1 className="text-[2rem] text-white">Hello friend!</h1>
            <h2 className="text-xl text-white">
              You should Login to use more functionality in my website.
            </h2>
          </div>
        ) : (
          <div>
            <h1 className="text-[2rem] text-white">Hello friend!</h1>
            <h2 className="text-xl text-white">
              You can Create Account If You are not already has an account for
              this website.
            </h2>
          </div>
        )}

        <button
          onClick={handleClick}
          className={`px-4 py-2 border mt-4 rounded-2xl bg-white text-lg`}
        >
          {signUpBtn ? "Sign In" : "Sign Up"}
        </button>

        <Link className="text-white mt-6 underline text-xl" to="/">
          Back to home page
        </Link>
      </div>
    </div>
  );
};

export default Login;
