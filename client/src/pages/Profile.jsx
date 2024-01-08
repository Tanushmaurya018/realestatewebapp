import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <div className="container mx-auto flex flex-col justify-center items-center p-12 gap-5 bg-gray-100">
      <div className="flex flex-col justify-center items-center p-8 gap-5 bg-gray-200 rounded-2xl shadow-xl border-2 border-gray-300">
        <h1 className="text-5xl">YOUR PROFILE </h1>
        <img
          className="w-[150px] h-[150px] rounded-full"
          src={currentUser.userWoPassword.photoURL}
        ></img>
        <input
          className="text-xl p-3 rounded-xl"
          value={currentUser.userWoPassword.username}
        />
        <input
          className="text-xl p-3 rounded-xl"
          value={currentUser.userWoPassword.email}
        />
        <input className="text-xl p-3 rounded-xl" placeholder="Password" />
        <div className="flex gap-3">
          <button className="text-xl rounded-xl text-white bg-green-600 p-3">
            Update Profile
          </button>
          <button className="text-xl rounded-xl text-white bg-blue-600 p-3">
            create Listing
          </button>
        </div>
        <div className="flex text-red-600 text-xl w-full justify-between">
          <h1>Delete Account</h1>
          <h1>Log Out</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
