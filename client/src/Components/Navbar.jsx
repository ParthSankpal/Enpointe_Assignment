import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";


const Navbar = () => {
 const [currentUser, setcurrent] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  

  

  return (
    <header className=" fonts-Poppins bg-slate-200 shadow-md ">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-500">Saral</span>
            <span className=" text-slate-700">Bank</span>
          </h1>
        </Link>

        <ul className=" flex gap-4">
          <Link to="/">
            <li className=" hidden sm:inline text-slate-700 hover:underline hover:text-slate-400">
              Home
            </li>
          </Link>

          <Link to="about">
            <li className=" hidden sm:inline text-slate-700 hover:underline hover:text-slate-400">
              About
            </li>
          </Link>

          <Link to="profile">
            {currentUser ? (
              <img
                className=" rounded-full h-7 w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline hover:text-slate-400">
                Sign In
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
