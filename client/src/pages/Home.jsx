import React from "react";
import backgroundImage from "../assets/giant-glass-buildings.jpg";
import {
  RiLuggageDepositFill,
  RiFundsBoxFill,
  RiStockFill,
} from "react-icons/ri";
import { BiSolidDonateHeart } from "react-icons/bi";

const Home = () => {
  return (
    <div
      className="bg-center  backdrop-blur-md bg-no-repeat bg-cover h-[75vh] w-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className=" font-Spotify flex flex-col min-[1025px]:flex-row gap-2 items-center justify-between mx-auto w-full  p-3 max-w-6xl  text-[#2f3d7e]">
        <div>
          <div className=" sm:text-6xl  text-xl pb-4 pt-12  font-extrabold">
            <span>Where Money </span>
            <br />
            <span> Meets trust</span>
          </div>
          <span className=" sm:text-2xl text-md  font-bold ">
            Empowering Your Financial Journey.
            <br /> Securely managing your transactions,
            <br /> every step of the way.
          </span>
        </div>
        <div className="text-xs sm:text-lg bg-slate-100 bg-opacity-50 h-full mt-12 p-5 rounded-lg">
         
          <span className=" text-start "> Grow Your Investments</span>
          <div className=" grid grid-cols-2 py-4 gap-4">
            <div className=" flex flex-col justify-center items-center">
              
              <div className=" bg-slate-50 rounded-full p-2 sm:p-3"><RiLuggageDepositFill  /></div>
              <p>Fixed Deposit </p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              
              <div className=" bg-[#2f3d7e] text-white rounded-full p-2 sm:p-3"><RiFundsBoxFill /></div>
              <p>Mutual Funds</p>
            </div>

            <div className=" flex flex-col justify-center items-center">
              <div className=" bg-red-500 rounded-full p-2 sm:p-3"><RiStockFill /></div>
              <p>Invest in Stocks</p>
            </div>

            <div className=" flex flex-col justify-center items-center">
         
              <div className=" bg-yellow-400 rounded-full p-2 sm:p-3 "><BiSolidDonateHeart /></div>
              <p>Retirement Plan</p>
            </div>
          </div>
          </div>
   
      </div>
    </div>
  );
};

export default Home;
