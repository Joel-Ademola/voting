import React from "react";
import { Link } from "react-router-dom";
import { arrow2 } from "../assets";

const HomeButton = () => {
  return (
    <div className="w-full mt-[50px] flex justify-start items-center p-4 bg-white h-[50px] rounded-[10px]">
      <img
        src={arrow2}
        alt="back"
        className=" w-[40px] h-[40px] object-contain"
      />
      <Link
        to="/"
        className="font-epilogue font-bold text-[25px] text-black ml-[20px]"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default HomeButton;
