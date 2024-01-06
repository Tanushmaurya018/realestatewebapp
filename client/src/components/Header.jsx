import React from "react";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    <header className="container mx-auto bg-gray-300 h-[70px] flex justify-between items-center p-3">
       <h1 className="text-lg md:text-3xl">Real Estate</h1>

     <div className="flex justify-center items-center gap-2">
        <input
          type="text"
          className="w-[150px] md:w-[800px] h-[20px] md:h-[40px] p-4 rounded-full text-lg  md:text-2xl items-center justify-center "
          placeholder="Search..."
        ></input>
        <CiSearch  className="bg-gray-200 rounded-full w-auto h-auto p-2 text-xl md:text-3xl hover:bg-white hover:text-black transition ease-in-out"/>
      </div>

       <ul className="flex items-center gap-5 text-2xl">
        <li className="hidden md:flex">About</li>
        <li className="text-lg md:text-2xl rounded-full bg-blue-900 px-4 py-1 text-white">Log In</li>

      </ul> 
    </header>
  );
};

export default Header;
