import React, { useState } from "react";
import defaultListPic from "../assets/defaultListPic.png";
import axios from "axios";
const CreateListing = () => {
  const [formData, setFormData] = useState({
    title:'',
    description:'',
    address:'',
    furnished:'',
    parking:'',
    rent:'',
    sale:'',
    bedroom:'',
    bathroom:'',
    regularprice:'',
    discountedprice:'',
  });
  const [isChecked, setChecked] = useState(false);

  const changeUserData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {

    try {
      const response =await axios.post('/api/listing/createlisting',formData);
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  console.log(formData);
  return (
    <div className="container mx-auto p-2 h-full w-full">
      <div className="flex flex-col  gap-20 w-full bg-gray-200 rounded-2xl p-5">
        <h1 className=" text-6xl font-Montserrat text-center">
          Create Listing
        </h1>
        <div className="flex justify-between w-full ">
          <div className="flex flex-col gap-5 w-2/3">
            <input
              type="text"
              name="title"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              onChange={changeUserData}
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
              required
            ></textarea>
            <input
              type="text"
              name="address"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Address"
              onChange={changeUserData}
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
                    required
                  ></input>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center border-2 gap-5 border-red-200 p-5">
            <img
              width="400px"
              height="400px"
              src={defaultListPic}
              className=" bg-cover "
            ></img>
            <input
              type="file"
              name="images"
              className="relative opacity-70 bg-purple-300 px-5 py-3 rounded-full"
              onChange={(e)=>e.target.files}
            ></input>
            {/* <label className="absolute bottom-10">Upload </label> */}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="font-Montserrat  text-xl rounded-full px-16 text-white
           bg-green-600 hover:bg-white hover:text-black transition ease-linear 
           p-3"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
