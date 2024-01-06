import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaGoogle, FaLaptopHouse } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const changeUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", userData);
      console.log(response.data);
      if (response.data.message === "User already exist") {
        setError(response.data.message);
        navigate("/signup");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(loading);

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <div
          className="container mx-auto p-20 lg:p-12  font-roboto  bg-white bg-opacity-50
transition-colors duration-500 hover:"
        >
          <div className="flex flex-col gap-5 justify-center items-center  ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 backdrop-blur shadow-2xl p-2
     lg:p-5 rounded-2xl text-white items-center bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200"
            >
              <div className="text-center text-white rounded-full p-5 lg:p-10 text-3xl lg:text-7xl bg-gray-900">
                <FaRegUser />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={userData.username}
                className="italic text-xl lg:text-2xl text-white px-5 py-2 rounded-full bg-gray-600 bg-opacity-60"
                onChange={changeUserData}
                required
              ></input>
              <input
                type="email"
                name="email"
                placeholder="Email ID"
                value={userData.email}
                className="italic text-xl lg:text-2xl text-white px-5 py-2 rounded-full bg-gray-600 bg-opacity-60"
                onChange={changeUserData}
                required
              ></input>
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={userData.password}
                className="italic text-white text-xl lg:text-2xl px-5 py-2 rounded-full bg-gray-600 bg-opacity-60"
                onChange={changeUserData}
                required
              ></input>
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className={`m-2 text-2xl bg-gray-900 text-gray-300 bg-opacity-20 px-10 py-3 rounded-full`}
                >
                  Sign Up
                </button>
                {error && <span className="text-red-600">!! {error} !!</span>}
                <div className="flex items-center gap-2 p-2 text-gray-700">
                  <hr className="w-[100px] h-[5px] bg-gray-700" />
                  <h1>OR</h1>
                  <hr className="w-[100px] h-[5px] bg-gray-700" />
                </div>
                <button type="submit" className="bg-gray-900  rounded-full p-5">
                  <FaGoogle />
                </button>
                <div className="flex justify-center items-center text-gray-700">
                  <h1 className="m-2 ">Already have an account ?</h1>
                  <Link to="/login" className="underline text-blue-500">
                    Log In
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
