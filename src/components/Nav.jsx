import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavDropDown from "./NavDropDown";
import axios from "axios";
import LogOutMessage from "./LogOutMessage";

const Nav = ({ scrollToFooter }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const user_data = JSON.parse(localStorage.getItem("user_data"));
  const token = user_data?.token;

  const confirmLogout = async () => {
    try {
      setIsLoading(true);
      await axios.get("http://127.0.0.1:8000/api/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("user_data");
      window.location.reload();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsVisible(false);
      setIsLoading(false);
    }
  };

  const cancelLogout = () => {
    // Hide the confirmation dialog
    setIsVisible(false);
  };

  const handleLogout = async () => {
    setIsVisible(true);
  };


  return (
    <div className="flex justify-between items-center  p-8 py-6 w-full shadow-md">
      <Link to="/" className="text-2xl font-bold">
        Website
      </Link>
      <ul className="flex">
        <li className="m-0 p-0">
          <NavDropDown />
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={scrollToFooter}>About</button>
        </li>

        <li>
          <Link to="/favorite">Favorite</Link>
        </li>

        <li className="rounded-lg bg-purple-500 text-white font-bold relative z-40">
          {user_data?.token.length && user_data?.name.length > 0 ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <Link to="/auth">Sign Up</Link>
          )}
        </li>
      </ul>
      {isVisible && (
        <LogOutMessage
          confirm={confirmLogout}
          cancel={cancelLogout}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default Nav;
