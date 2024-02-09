import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart  } from "../redux/user/userSlice";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    dispatch(signOutUserStart());
    try {
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
          dispatch(signOutUserFailure(data.message));
          return;
        }
        dispatch(signOutUserSuccess(data));
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className="pt-10 max-w-2xl mx-auto text-[#2f3d7e]">
      <div className=" flex flex-col justify-center items-center">
        <CgProfile className=" text-5xl" />
        <h1 className="sm:text-3xl text-center font-semibold my-7">
          Hello, {currentUser.Username}
        </h1>
        <span className="sm:text-3xl text-center font-semibold my-7">
          Your Email : <span className="italic">{currentUser.Email}</span>
        </span>
      </div>
      <div className="justify-end flex ">
      <button
          disabled={loading}
          onClick={handleSignOut}
          className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Out"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
