import React, { useState } from "react";
import defaultListPic from "../assets/defaultListPic.png";
import axios from "axios";

const CreateListing = (props) => {


  const fetchData = async () => {

    try {
      const response =await axios.get(`/api/listing/${j}`);
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }

  };


  return (
    <div className="container mx-auto p-2 h-full w-full">
      <div className="flex flex-col  gap-16 w-full bg-gray-200 rounded-2xl p-5">
        <h1 className=" text-6xl font-Montserrat text-center">
          {props.title} South Delhi GK-2 apartment
        </h1>
        <div className="flex w-full">
          <div className="flex flex-col gap-5 w-2/3">
            <h1 className="text-3xl px-1 w-full "> 
              {props.title} South Delhi GK-2 apartment
            </h1>
            <p
              className=" text-xl p-3 mt-2 w-full"
            >
                {props.description} Nestled in the heart of a serene countryside, this enchanting 
                property offers a perfect blend of rustic charm and modern elegance. Surrounded by 
                lush greenery and towering trees, the landscape creates a tranquil haven that welcomes
                residents into a world of peace and serenity. The property boasts a meticulously 
                designed exterior with a harmonious mix of stone and wood accents, creating a timeless
                and inviting facade. Stepping inside, one is greeted by a spacious interior that 
                seamlessly combines contemporary design elements with classic aesthetics. Expansive
                windows allow natural light to flood the living spaces, highlighting the carefully 
                chosen finishes and thoughtful details. The open-concept layout effortlessly connects
                the gourmet kitchen, adorned with top-of-the-line appliances, to the inviting living
                area, creating a perfect setting for both intimate gatherings and grand entertaining.
                With well-manicured gardens, a private patio, and luxurious amenities, this property
                is not just a residence but a retreat, offering a lifestyle of comfort and sophistication.
            </p>
            <h1
              className="text-2xl px-1  mt-2  w-full "
              
            >{props.address}Address : South Delhi GK-2</h1>

            <div className="flex items-center justify-between text-xl gap-10">
              <div className="flex flex-col gap-5 w-1/2 justify-between">
                <div className="w-full flex gap-5 justify-between">
                  <label>Furnished</label>
                  <h1
                    className="h-10 w-40 px-4 py-2    uppercase "
                  >{props.furnished}</h1>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Parking</label>
                  <h1
                    className="h-10 w-40 px-4 py-2    uppercase "
                  >{props.parking}</h1>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Rent</label>
                  <h1
                    className="h-10 w-40 px-4 py-2    uppercase "
                  >{props.rent}</h1>
                </div>
                <div className="w-full flex gap-5 justify-between">
                  <label>Sale</label>
                  <h1
                    className="h-10 w-40 px-4 py-2    uppercase "
                  >{props.sale}</h1>
                </div>
              </div>

              <div className="text-xl flex flex-col gap-5 w-2/4 ">
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Bedroom</label>
                  <h1
                    className="text-xl px-1  mt-2 "
                    
                    >{props.bedroom}</h1>
                    </div>{" "}
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Bathroom</label>
                  <h1
                    className="text-xl px-1  mt-2 "
                    
                    >{props.bathroom}</h1>
                    </div>{" "}
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Regular Price</label>
                  <h1
                    className="text-xl px-1  mt-2 "
                    
                  >{props.regularprice}</h1>
                </div>{" "}
                <div className="w-full flex gap-5 justify-between items-end">
                  <label>Discounted Price</label>
                  <h1
                    className="text-xl px-1  mt-2 "
                    
                    >{props.discountedprice}</h1>
                    </div>{" "}
              </div>
            </div>
          </div>
          <div className="w-1/3">

<img src={defaultListPic}></img>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateListing;
