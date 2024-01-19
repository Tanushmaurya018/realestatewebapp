import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 transition-all ease-linear ">
      <div className="container mx-auto flex flex-col justify-center items-center gap-2 text-2xl ">
        <p className="">&copy; 2024 Maurya Estates. All rights reserved.</p>
        <div className="flex gap-5 justify-center items-center w-full ">

          <a href="https://twitter.com/TanushMaurya" className="text-white mr-4 hover:text-gray-500">
          <FaXTwitter />
          </a>

          <a href="https://www.linkedin.com/in/tanush-maurya-58450924a/" className="text-white mr-4 hover:text-gray-500">
          <CiLinkedin />
          </a>

          <a href="https://tanushportfolio.vercel.app/" className="text-white hover:text-gray-500">
            Portfolio
          </a>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
