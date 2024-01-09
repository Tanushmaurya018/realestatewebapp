import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { FaPlus } from "react-icons/fa";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  signOutUserSuccess,
  signOutUserStart,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
} from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
const dispatch=useDispatch()
  const changeUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log(formData)
const handleSubmit=async()=>{
  dispatch(updateUserStart())
  const response=await axios.post(`/api/user/update/${currentUser.userWoPassword._id}`,formData)
  dispatch(updateUserSuccess(response.data))
  console.log(response.data)
}
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, photoURL: downloadURL })
        );
      }
    );
  };

  const handleLogOut=async()=>{
    dispatch(signOutUserStart())
    const response=await axios.get("/api/auth/logout")
    console.log(response.data.message)
    dispatch(signOutUserSuccess())
  }

  const handleDelete=async()=>{
    const response=await axios.post(`/api/user/delete/${currentUser.userWoPassword._id}`);
    dispatch(deleteUserSuccess())
    console.log(response.data)

  }
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  return (
    <div className="container mx-auto flex flex-col justify-center items-center p-12 gap-2 bg-gray-100">
      <div className="flex flex-col justify-center items-center p-8 gap-3 bg-gray-200 rounded-2xl shadow-xl border-2 border-gray-300">
        <h1 className="text-5xl">YOUR PROFILE</h1>
        <div className="relative border-2 border-black top-0 bottom-0  rounded-full overflow-hidden">
          <img
            className=" w-[150px] h-[150px]  "
            src={formData.photoURL || currentUser.userWoPassword.photoURL}
            alt="User Profile"
          />
          <hr className=" bg-blue-600 absolute h-[40px] w-full bottom-0" />
          <span className="absolute right-0 left-0 bottom-[10px] text-center  text-white underlines text-md">
            Update
          </span>
          <input
            type="file"
            name="photoURL"
            accept='image/*'
            className="absolute top-0 bottom-0 opacity-0 cursor-pointer"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          className="text-xl p-3 rounded-xl mt-4"
          name="username"
          onChange={changeUserData}
          placeholder={currentUser.userWoPassword.username}
        />
        <input
          className="text-xl p-3 rounded-xl mt-2"
          name="email"
          onChange={changeUserData}

          placeholder={currentUser.userWoPassword.email}
        />
        <input
          type="password"
          className="text-xl p-3 rounded-xl mt-2"
          name="password"
          onChange={changeUserData}

          placeholder="New Password"
        />
        <div className="flex gap-3 mt-4">
          <button onClick={handleSubmit} className="text-xl rounded-xl text-white bg-green-600 hover:bg-white hover:text-black transition ease-linear p-3">
            Update Profile
          </button>
          <button className="text-xl rounded-xl text-white bg-blue-600 hover:bg-white hover:text-black transition ease-linear p-3">
            Create Listing
          </button>
        </div>
        <div className="flex text-red-600 text-xl w-full justify-between mt-4">
          <h1 onClick={handleDelete}>Delete Account</h1>
          <h1 onClick={handleLogOut}>Log Out</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
