import axios from "axios";
import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { signInSuccess }  from "../redux/user/userSlice"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
const navigate =useNavigate();
  const dispatch = useDispatch();

  async function fetchData() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    const result = await signInWithPopup(auth, provider);

    console.log(result);

    

  
  

    try {
      const response = await axios.post("/api/auth/google", {
        username: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      }, {
        withCredentials: "include",
      });
      console.log(response.data);
      dispatch(signInSuccess(response.data));

      if (response.data.user?.currentUser?.message =="User Created" || "Logged In successfully") {
        console.log(response.data.user?.currentUser?.message);

        navigate("/")
        
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="">
      <button
        type="button"
        onClick={fetchData}
        className="bg-gray-900  rounded-full p-5"
      >
        <FaGoogle />
      </button>
    </div>
  );
};

export default GoogleAuth;
