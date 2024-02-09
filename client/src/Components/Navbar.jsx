import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    navigate(event.target.value);
  };
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="  font-Spotify bg-[#2f3d7e] shadow-md text-[#faeaeb]">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="/">
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="">Saral</span>
            <span className=" ">Bank</span>
          </h1>
        </Link>

        <ul className=" flex gap-4 items-center">
          <Link to="/">
            <li className=" hidden sm:inline  hover:underline hover:text-slate-400">
              Home
            </li>
          </Link>

          <Link to="#">
            <li className=" hidden sm:inline hover:underline hover:text-slate-400">
              About
            </li>
          </Link>

          
            {currentUser ? (
              <Link to="profile" className=""><CgProfile className=" text-xl align-middle" /></Link>
            ) : (
              <select
                id="countries"
                className="bg-[#2f3d7e] text-white rounded-lg block w-full p-2.5"
                onChange={handleSelectChange} 
              >
                <option value="/usersign-in">Sign in</option>{" "}
                <option value="/bankersign-in">
                  Sign in as a Bank Official
                </option>
                <option value="/usersign-in">Sign in as Customer</option>
              </select>
            )}
          
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
