import React from "react";

const CreateListing = () => {
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
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Title"
            ></input>
            <textarea
              type="text"
              className="h-[200px] text-xl p-3 bg-transparent border-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Description"
            ></textarea>
            <input
              type="text"
              className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
        focus:outline-none w-full focus:bg-transparent"
              placeholder="Address"
            ></input>

            <div className="flex items-center justify-between text-xl gap-10">
              <div className="flex flex-col gap-5 w-1/4">
                <div className="w-full flex gap-5 justify-between">
                  <label>Furnished</label>
                  <input type="radio" className="h-5 w-5 "></input>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Parking</label>
                  <input type="radio" className="h-5 w-5 "></input>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Rent</label>
                  <input type="radio" className="h-5 w-5 "></input>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Sale</label>
                  <input type="radio" className=" h-5 w-5 "></input>
                </div>
              </div>

              <div className="text-xl flex flex-col gap-5 w-2/4 ">
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Bedroom</label>
                  <input
                    type="number"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                  ></input>
                </div>{" "}
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Bathroom</label>
                  <input
                    type="number"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Regular Price</label>
                  <input
                    type="number"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                  ></input>
                </div>
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Discounted Price</label>
                  <input
                    type="number"
                    className="text-xl px-1 bg-transparent border-b-2 border-gray-500 mt-2 
                    focus:outline-none w-1/2 focus:bg-transparent"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center">image</div>
        </div>
        <div>
          <button className="font-Montserrat text-xl rounded-full px-16 text-white bg-green-600 hover:bg-white hover:text-black transition ease-linear p-3">
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
