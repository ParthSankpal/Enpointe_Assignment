import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";


const Navbar = () => {
 const [currentUser, setcurrent] = useState([])
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  

  

  return (
    <header className=" fonts-Poppins bg-[#2f3d7e] shadow-md text-[#faeaeb]">
      <div className=" flex justify-between items-center max-w-6xl mx-auto p-4">
        <Link to="#">
          <h1 className=" font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="">Saral</span>
            <span className=" ">Bank</span>
          </h1>
        </Link>

        <ul className=" flex gap-4 items-center">
          <Link to="#">
            <li className=" hidden sm:inline  hover:underline hover:text-slate-400">
              Home
            </li>
          </Link>

          <Link to="#">
            <li className=" hidden sm:inline hover:underline hover:text-slate-400">
              About
            </li>
          </Link>

          <Link to="profile" className="">
            {currentUser ? (
              
              <CgProfile className=" text-xl align-middle"/>
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
