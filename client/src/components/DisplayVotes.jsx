import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import FundCard from "./FundCard";
import { loader } from "../assets";
import { Navbar, Loader, BackHome } from "../components";

const DisplayVotes = ({ title, isLoading, vote }) => {
  const navigate = useNavigate();

  const handleNavigate = (votes) => {
    navigate(`/vote-details/${votes.Title}`, { state: votes });
  };

  return (
    <div className="gradient-bg-welcome min-h-screen">
      <Navbar />
      <BackHome />;
      <h1 className="font-epilogue mx-5 font-semibold text-[18px] text-white text-left">
        {title} ({vote.length})
      </h1>
      <div className="flex flex-wrap mt-[20px] mx-5 gap-[26px]">
        {isLoading && (
          <Loader />
          // <img
          //   src={loader}
          //   alt="loader"
          //   className="w-[100px] h-[100px] object-contain"
          // />
        )}

        {!isLoading && vote === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any votes yet
          </p>
        )}

        {!isLoading &&
          vote.length > 0 &&
          vote.map((votes) => (
            <FundCard
              key={votes.pid}
              {...votes}
              handleClick={() => handleNavigate(votes)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayVotes;
