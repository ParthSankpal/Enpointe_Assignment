import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserRegister = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    isBanker: false, 
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Typo correction from 'loding' to 'loading'

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
    // console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      console.log(formData, "IN_SUBMIT");
      const res = await fetch("/api/auth/user-register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status code: ${res.status}`);
      }

      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      if (formData.isBanker) {
        navigate("/bankersign-in");
      } else {
        navigate("/usersign-in");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isBanker"
            onChange={handleChange}
            className="w-5 h-5"
          />
          <label htmlFor="isBanker" className="select-none">
            Register as Banker
          </label>
        </div>
        <button
          disabled={loading}
          className="bg-[#2f3d7e] text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign up"}
        </button>
        {/* <OAuth/> */}
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an Account?</p>
        <Link to={"/usersign-in"} className="text-blue-500">
          Sign in
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
};

export default UserRegister;
