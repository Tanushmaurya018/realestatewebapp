import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  async function fetchData() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    // console.log(result);
    const profileImg= result.user.photoURL
    // console.log(profileImg)
    dispatch(signInStart());

    try {
      const response = await axios.post(
        "/api/auth/google",
        {
          username: result.user.displayName,
          email: result.user.email,
          photoURL: profileImg,
        },
        {
          withCredentials: "include",
        }
      );

      // console.log("a",response.data);
      dispatch(signInSuccess(response.data));

      if (
        response.data.user?.currentUser?.message == "User Created" ||
        "Logged In successfully"
      ) {
        // console.log(response.data.user?.currentUser?.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure());
      console.log(error);
    }
  }

  return (
    <div className="">
      {loading ? (
        <Loader />
      ) : (
        <button
          type="button"
          onClick={fetchData}
          className="bg-gray-900  rounded-full p-5"
        >
          <FaGoogle />
        </button>
      )}
    </div>
  );
};

export default GoogleAuth;
