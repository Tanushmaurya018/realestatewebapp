import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { FaCamera } from "react-icons/fa";
import bg from "../assets/profileAndAuthBgvideo.mp4";
const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const changeUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // console.log(formData);

  const handleSubmit = async () => {
    dispatch(updateUserStart());
    const response = await axios.post(
      `/api/user/update/${currentUser.userWoPassword._id}`,
      formData
    );
    dispatch(updateUserSuccess(response.data));
    console.log(response.data);
  };
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

  const handleLogOut = async () => {
    dispatch(signOutUserStart());
    const response = await axios.get("/api/auth/logout");
    console.log(response.data.message);
    dispatch(signOutUserSuccess());
  };

  const handleDelete = async () => {
    const response = await axios.post(
      `/api/user/delete/${currentUser.userWoPassword._id}`
    );
    dispatch(deleteUserSuccess());
    console.log(response.data);
  };
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  console.log(currentUser.message);
  return (
    <div className=" container  mx-auto  flex flex-col justify-center items-center p-2 gap-2 h-full ">
      {/* <div className="fixed z-[-10] flex flex-col p-[40px] h-full w-full gap-20">
          <hr className="bg-gray-400 w-full h-[20px]" />
          <hr className="bg-gray-400 w-full h-[20px]" />
          <hr className="bg-gray-400 w-full h-[20px]" />
          <hr className="bg-gray-400 w-full h-[20px]" />
          <hr className="bg-gray-400 w-full h-[20px]" />
          <hr className="bg-gray-400 w-full h-[20px]" />
          <hr className="bg-gray-400 w-full h-[20px]" />

        </div> */}
      <div className="h-full w-[1500px] flex flex-col justify-center items-center p-8 gap-3 bg-gray-200 bg-opacity-70 backdrop-blur rounded-2xl shadow-xl border-2 border-gray-300">
        <h1 className="text-5xl font-Montserrat">YOUR PROFILE</h1>

        <div className="flex flex-row-reverse w-full gap-24  h-full justify-evenly">
          <div className="flex flex-col gap-10  items-center">
            <div className="relative border-2 border-black top-0 bottom-0  rounded-full overflow-hidden">
              <img
                className=" w-[250px] h-[250px]  "
                src={formData.photoURL || currentUser.userWoPassword.photoURL}
                alt="User Profile"
              />

              <hr className=" bg-blue-600 absolute h-[80px] w-full bottom-0" />

              <span className="absolute  bottom-[15px] right-[103px] text-center text-white ">
                <FaCamera className="text-5xl text-gray-300" />
              </span>
              <input
                type="file"
                name="photoURL"
                accept="image/*"
                className="absolute top-0 bottom-0 opacity-0 cursor-pointer"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
            <p className="text-xl text-center self-center">
              {fileUploadError ? (
                <span className="text-red-700">
                  Error Image upload (image must be less than 2 mb)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  Image successfully uploaded!
                </span>
              ) : (
                ""
              )}
            </p>
          </div>

          <div className="flex flex-col gap-5 justify-between w-3/4 ">
            <div className="p-2 flex flex-col gap-6">
              <div className="flex gap-5 items-end font-Manrope text-4xl border-b-4 pb-2">
                <label className="text-5xl font-bold">Name :</label>
                <h1>{currentUser.userWoPassword.username}</h1>
              </div>{" "}
              <div className="flex gap-5 items-end font-Manrope text-4xl border-b-4 pb-2">
                <label className="text-5xl font-bold">E-Mail :</label>
                <h1>{currentUser.userWoPassword.email}</h1>
              </div>{" "}
            </div>

            <h1 className="text-3xl font-thin">Update Profile :</h1>
            <div className="p-2 flex flex-col gap-5 ">
              <input
                className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-4 focus:outline-none w-full focus:bg-transparent"
                name="username"
                onChange={changeUserData}
                placeholder={currentUser.userWoPassword.username}
              />
              <input
                className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 focus:outline-none w-full focus:bg-transparent"
                name="email"
                onChange={changeUserData}
                placeholder={currentUser.userWoPassword.email}
              />
              <input
                type="password"
                className="text-xl  bg-transparent border-b-2 border-gray-500 mt-2 focus:outline-none w-full focus:bg-transparent"
                name="password"
                onChange={changeUserData}
                placeholder="New Password"
              />
              {currentUser.message !=
                ("Logged In successfully" ||
                  "User Created and Logged In successfully") && (
                <label
                  className={`${
                    currentUser.message == "User Updated"
                      ? "text-green-600"
                      : "text-red-500"
                  } text-xl `}
                >
                  !! {currentUser.message} !!
                </label>
              )}
            </div>

            <div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleSubmit}
                  className="font-Montserrat text-xl rounded-full px-16 text-white bg-green-600 hover:bg-white hover:text-black transition ease-linear p-3"
                >
                  Update Profile
                </button>
                <button className="font-Montserrat text-xl rounded-full px-16 text-white bg-blue-600 hover:bg-white hover:text-black transition ease-linear p-3">
                  Create Listing
                </button>
              </div>
              <div className="flex text-red-600 text-xl w-full justify-between mt-4">
                <h1
                  className="cursor-pointer font-sm transition-all hover:font-bold duration-200 ease-in-out underline "
                  onClick={handleDelete}
                >
                  Delete Account ?
                </h1>
                <h1
                  className="cursor-pointer font-sm transition-all hover:font-bold duration-200 ease-in-out underline "
                  onClick={handleLogOut}
                >
                  Log Out ?
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
