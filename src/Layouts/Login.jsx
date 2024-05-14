// import axios from "axios";
// import React, { useState } from "react";
// import { redirect, useNavigate } from "react-router-dom";

// const Login = () => {
//   const [hide, setHide] = useState("password");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const handleChange = (e) => {
//     e.preventDefault();
//     if (hide == "password") {
//       setHide("text");
//     } else {
//       setHide("password");
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login", {
//         email,
//         password,
//       });
//       setEmail("")
//       setPassword("")
//       console.log(response.data)
//       // localStorage.setItem('token', response.data);
//       localStorage.setItem('user_data', JSON.stringify(response.data))
//       navigate('/')
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form className="w-[600px] rounded-lg shadow-lg flex flex-col border mx-auto my-20 p-10">
//         <h1 className="text-center text-[2.5rem] text-purple-950">Login</h1>
//         <div className="flex flex-col">
//           <label htmlFor="Email" className="text-2xl">
//             Email
//           </label>
//           <input
//             id="Email"
//             type="email"
//             className="border outline-none text-xl rounded-lg shadow-sm px-4 py-2"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="mt-4">
//           <label htmlFor="password" className="text-2xl">
//             Password
//           </label>
//           <div className="flex">
//             <input
//               id="password"
//               type={hide}
//               className="flex-1 border outline-none text-xl rounded-lg shadow-sm px-4 py-2"
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <button
//               onClick={handleChange}
//               className=" w-[50px] bg-blue-300 rounded-lg"
//             >
//               Hide
//             </button>
//           </div>
//         </div>
//         <button onClick={handleLogin} className="p-2 rounded-lg text-xl font-bold text-white mt-4 bg-blue-400">
//           Sumbit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [right, setRight] = useState("");
  const [opacity, setOpacity] = useState("");
  const [signUpBtn, setSignUpBtn] = useState(true);
  const [opacityLogin, setOpacityLogin] = useState("");

  const [hide, setHide] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });
      setEmail("");
      setPassword("");
      console.log(response.data);
      localStorage.setItem("user_data", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
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

  const loginWithGoogle = async () => {
    const response = axios.get('http://127.0.0.1:8000/api/login/google')
  }
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

          <button onClick={loginWithGoogle} className="border rounded-lg border-black p-2 flex gap-4 items-center justify-center">
            <img
              className="w-[66px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
              alt=""
            />
          </button>
        </div>
        <div
          className={`register-form flex flex-col gap-4 p-10 justify-center ${opacity}`}
        >
          <input
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="text"
            placeholder="Username"
          />
          <input
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="email"
            placeholder="Email"
          />
          <input
            className="px-4 py-2 rounded-md outline-none border border-gray-400 text-lg"
            type="password"
            placeholder="Password"
          />
          <button className="p-2 bg-blue-500 rounded-lg text-white text-lg">
            Sign Up
          </button>
          <button className="border rounded-lg border-black p-2 flex gap-4 items-center justify-center">
            <img
              className="w-[66px]"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
              alt=""
            />
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
