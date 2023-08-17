import React from "react";

import { thirdweb } from "../assets";
import { Link } from "react-router-dom";

const Footer = () => (
  <div className="w-full flex bg-[#000000] md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={thirdweb} alt="logo" className="w-32" />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <Link
          to="/create-vote"
          className="text-white text-base text-center mx-2 cursor-pointer"
        >
          Create Vote
        </Link>

        <Link
          to="/vote-list"
          className="text-white text-base text-center mx-2 cursor-pointer"
        >
          Votes
        </Link>

        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Tutorials
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Wallets
        </p>
      </div>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@example2023</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
