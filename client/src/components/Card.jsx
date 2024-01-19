import axios from "axios";
import React, { useEffect, useState } from "react";

const Card = (props) => {
  // const [list,setList]=useState();
  //     const fetchData=async()=>{
  //     const response=await axios.get(`/api/getalllist`)

  //     setList(response.data.allList)

  // }

  // useEffect(()=>{
  //     fetchData()
  // },[])

  return (
    <div className="hover:scale-105  duration-200  bg-orange-100 hover:bg-white transition-all ease-linear text-orange-600 hover:text-black m-5 rounded-2xl p-4">
      <div className="flex flex-col justify-between w-[300px] md:w-[450px] h-[400px]  gap-5 overflow-hidden b">
        <img src={`${props.imageUrls}`} className=" object-cover rounded-2xl flex justify-center items-center w-[450px] h-[230px]" />
        <h1 className="text-3xl font-bold ">{props.title}</h1>
        <h1 className="text-xl text-black font-medium">{props.address}</h1>
      </div>
    </div>
  );
};

export default Card;
