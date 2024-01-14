import React, { useEffect, useState } from "react";
import defaultListPic from "../assets/defaultListPic.png";
import axios from "axios";
import { app } from "../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { formatProdErrorMessage } from "@reduxjs/toolkit";
import { useNavigate ,useParams} from "react-router-dom";
import Loader from "../components/Loader";


const EditList = () => {
  const [files, setFiles] = useState([]);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: "a",
    description: "a",
    address: "a",
    furnished: "a",
    parking: "a",
    rent: "a",
    sale: "a",
    bedroom: "5",
    bathroom: "5",
    regularprice: "5",
    discountedprice: "5",
    imageUrls: [],
  });
  const [filePerc, setFilePerc] = useState(0);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
  const params=useParams();

  const uploadImage = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 5) {
      const promises = [];
      setUploading(true);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed (2 mb max per image)");
          setUploading(false);
        });
    } else {
      if (files.length>4) {
        setImageUploadError("You can only upload 4 images per listing");
        setUploading(false);
      }

    }
  };
  const deleteImageUrl = (i) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, key) => i !== key),
    });
  };
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storgeRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storgeRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFilePerc(Math.round(progress));
          },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const changeUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`/api/listing/update/${listingId}`, formData);
      console.log("Saved Listing",response.data);
      navigate(`/listing/${listingId}`)
      setLoading(false)

    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

//   const handleUpdate =async()=>{
//         const response=await axios.post(`/api/listing/update`,formData)
//   }
const listingId=params.listId

  useEffect(()=>{
    const fetchData=async()=>{

        const response=await axios.get(`/api/listing/update/${listingId}`)
        setFormData(response.data)
        console.log(response.data)
    }

    fetchData()
  },[])

  return (
    <div className="container mx-auto p-2 h-full w-full">
            {loading ? (
        <Loader />
      ) : (
      <div className="flex flex-col  gap-20 w-full bg-gray-200 rounded-2xl p-5">
        <h1 className=" text-6xl font-Montserrat text-center">
          Edit Your Listing
        </h1>
        <div className="flex justify-between w-full ">
          <div className="flex flex-col gap-5 w-2/3">
            <input
              type="text"
              name="title"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              onChange={changeUserData}
              value={formData.title}
              placeholder="Title"
              required
            ></input>
            <textarea
              type="text"
              name="description"
              className="h-[200px] text-xl p-3 bg-transparent border-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Description"
              onChange={changeUserData}
              value={formData.description}
              required
            ></textarea>
            <input
              type="text"
              name="address"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Address"
              onChange={changeUserData}
              value={formData.address}
              required
            ></input>

            <div className="flex items-center justify-between text-xl gap-10">
              <div className="flex flex-col gap-5 w-1/2 justify-between">
                <div className="w-full flex gap-5 justify-between">
                  <label>Furnished</label>
                  <input
                    type="text"
                    // onChange={handleCheckboxChange}
                    name="furnished"
                    className="h-10 w-40 px-4 py-2 rounded-full  uppercase "
                    onChange={changeUserData}
                    value={formData.furnished}
                    required
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Parking</label>
                  <input
                    type="text"
                    // onClick={checkBox}
                    name="parking"
                    className="h-10 w-40 px-4 py-2 rounded-full  uppercase "
                    onChange={changeUserData}
                    value={formData.parking}
                    required
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Rent</label>
                  <input
                    type="text"
                    // onClick={checkBox}
                    name="rent"
                    className="h-10 w-40 px-4 py-2 rounded-full  uppercase "
                    onChange={changeUserData}
                    value={formData.rent}
                    required
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Sale</label>
                  <input
                    type="text"
                    // onClick={checkBox}
                    name="sale"
                    className=" h-10 w-40 px-4 py-2 rounded-full  uppercase "
                    onChange={changeUserData}
                    value={formData.sale}
                    required
                  ></input>
                </div>
              </div>

              <div className="text-xl flex flex-col gap-5 w-2/4 ">
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Bedroom</label>
                  <input
                    type="number"
                    name="bedroom"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                    onChange={changeUserData}
                    value={formData.bedroom}
                    required
                  ></input>
                </div>{" "}
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Bathroom</label>
                  <input
                    type="number"
                    name="bathroom"
                    onChange={changeUserData}
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                    value={formData.bathroom}
                    required
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Regular Price</label>
                  <input
                    type="number"
                    name="regularprice"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                    onChange={changeUserData}
                    value={formData.regularprice}
                    required
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Discounted Price</label>
                  <input
                    type="number"
                    name="discountedprice"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                    onChange={changeUserData}
                    value={formData.discountedprice}
                    required
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center border-2 gap-5 border-red-200 p-5">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((img, i) => (
                <div
                  className="flex justify-between items-center w-full bg-gray-100 p-4 rounded-md"
                  key={img}
                >
                  <img
                    src={img}
                    alt={img}
                    className="h-[100px] w-[120px] bg-cover rounded-lg"
                  />
                  <button
                    onClick={() => deleteImageUrl(i)}
                    className="text-red-500"
                  >
                    DELETE
                  </button>
                </div>
              ))}
            <input
              type="file"
              name="images"
              className="relative opacity-70 bg-purple-300 px-5 py-3 rounded-full"
              onChange={(e) => setFiles(e.target.files)}
              // value={formData.imageUrls}

              multiple
            ></input>
            {uploading ? (<div className="flex flex-col justify-center items-center">
              <button className="cursor-no-drop border-2 bg-blue-500 text-white px-10 py-2 rounded-full text-2xl">
                Uploading{" "}
              </button>
              <h1 className="text-green-800 text-xl">{filePerc}%</h1>
              </div>
            ) : (<div className="flex flex-col justify-center items-center">
              <button
                onClick={uploadImage}
                className="border-2 bg-blue-500 text-white px-10 py-2 rounded-full text-2xl"
              >
                Upload
              </button>
              </div>
            )}
            {imageUploadError && (
              <label className="text-red-500">!! {imageUploadError} !!</label>
            )}{" "}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="font-Montserrat  text-xl rounded-full px-16 text-white
           bg-green-600 hover:bg-white hover:text-black transition ease-linear 
           p-3"
            onClick={handleSubmit}
          >
            Update
          </button>
        </div>
      </div>
      )}
    </div>
  );
};

export default EditList;
