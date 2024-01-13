import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import GoogleAuth from "../components/GoogleAuth";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const {currentUser}=useSelector((state)=>state.user)

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();

  const changeUserData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  async function fetchData() {
    try {
      dispatch(signInStart());
      const response = await axios.post("/api/auth/login", userData, {
        withCredentials: "include",
      });

      if (response.data.message == "Logged In successfully") {
        navigate("/");
      } else {
        navigate("/login");
      }
      dispatch(signInSuccess(response.data));
      // console.log(response.data.message);
    } catch (error) {
      dispatch(signInFailure(error));
    }
  }

  function googleAuth(){

  }
  return (
    <div className="">
      {currentUser?.loading ? (
        <Loader />
      ) : (
        <div
          className="container mx-auto p-20 lg:p-16  font-roboto  bg-white bg-opacity-50 h-[100vh]
      transition-colors duration-500 hover:"
        >
          <div className="flex flex-col gap-5 justify-center items-center  ">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 backdrop-blur shadow-2xl p-2
             lg:p-5 rounded-2xl text-white items-center bg-gradient-to-t from-red-200 via-red-300 to-sky-200"
            >
              <div className="text-center text-white rounded-full p-5 lg:p-10 text-3xl lg:text-7xl bg-gray-900">
                <FaRegUser />
              </div>
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
                className={` italic text-white text-xl lg:text-2xl px-5 py-2 rounded-full  bg-opacity-60`}
                onChange={changeUserData}
                required


              ></input>
              {currentUser?.message != "Logged In successfully" && (
                <label className="text-red-500">{currentUser?.message}</label>
              )}
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  className="m-2 text-2xl bg-gray-900 text-gray-300 bg-opacity-20 px-10 py-3 rounded-full"
                >
                  Log In
                </button>
                {/* {user && <span className="text-red-600">!! {user.currentUser?.message} !!</span>} */}

                <div className="flex items-center gap-2 p-2">
                  <hr className="w-[100px]" />
                  <h1>OR</h1>
                  <hr className="w-[100px]" />
                </div>

                  <GoogleAuth/>
                  {/* import { FaGoogle } from "react-icons/fa"; //for React.js */}
               
                <div className="flex justify-center items-center text-gray-700">
                  <h1 className="m-2 ">Don't have an account ?</h1>
                  <Link to="/signup" className="underline text-blue-500">
                    Sign Up
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

export default Login;
