import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";

import { Context } from "../context/index.jsx";
import { CountBox, Loader, BackHome, Navbar } from "../components";
import { daysLeft } from "../utils";
import { thirdweb } from "../assets/index.js";

const VoteDetails = () => {
  const { state } = useLocation();
  const {
    currentAccount,
    contractAddress,
    setIsLoading,
    castVote,
    // getVotes,
    isLoading,
  } = useContext(Context);
  // const [voter, setVoter] = useState([]);
  const remainingDays = daysLeft(state.Deadline);


  const [selectedOption, setSelectedOption] = useState([]);
  // console.log(state.Voters, currentAccount);
  const hasVoted = state.Voters.some(
    (voter) => voter.toLowerCase() === currentAccount.toLowerCase()
  );

  const handleCastVote = async () => {
    isLoading && setIsLoading(true);
    if (selectedOption == "") return window.confirm("Please select an option.");
    if (selectedOption) {
      const confirmed = window.confirm(
        `Are you sure you want to vote for the option: ${selectedOption}?`
      );
      if (confirmed) {
        await castVote(state.pid, selectedOption);
        setSelectedOption(null);
        isLoading && setIsLoading(false);
        // alert(`Vote for the option "${selectedOption}" has been submitted.`);
      }
      // Here you can perform the necessary actions to submit the vote.
      // You can use the selected option and other relevant data to do this.

      // console.log("Vote submitted:", selectedOption);
    }
  };

  // console.log(state);
  return (
    <>
      <BackHome />
      <div className="gradient-bg-welcome min-h-screen">
        {isLoading && <Loader />}
        <Navbar />

        <div className=" w-full mt-5 flex md:flex-row flex-co gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={state.Image}
              alt="vote"
              className="w-full h-[410px] object-cover rounded-xl"
            />
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Hours Left" value={remainingDays} />
            <CountBox title="Total Voters" value={state.Voters.length} />
          </div>
        </div>

        <div className="mt-[60px] px-10 flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <img
                    src={thirdweb}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {state.Creator}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    10 Campaigns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Description
              </h4>

              <div className="mt-[10px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {state.Description}
                </p>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Result
              </h4>

              <div className="mt-[10px]">
                {state.Options.map((option) => (
                  <div key={option.Name}>
                    <p className="font-epilogue font-semibold text-[14px] text-white break-all truncate">
                      {option.Name} - {option.Votes}
                    </p>
                    {/* <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                    Votes: {option.Votes}
                  </p> */}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Voters
              </h4>

              <div className=" flex flex-col gap-4">
                {state.Voters.length > 0 ? (
                  <div className="mt-[10px]">
                    {state.Voters.map((voters) => (
                      <div key={voters}>
                        {/* setVoter(voters); */}
                        <p className="font-epilogue font-semibold text-[14px] text-white break-all truncate">
                          {voters}
                        </p>
                        {/* <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
                       Votes: {option.Votes}
                     </p> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No voters yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>
          {remainingDays === 0 ? (
            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <p className="mt-[20px] font-epilogue font-bold leading-[22px] text-white">
                Vote Ended
              </p>
            </div>
          ) : !hasVoted ? (
            <div className=" flex-1">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Vote
              </h4>

              <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                  Cast your vote
                </p>
                <div className="mt-[30px]">
                  {state.Options.map((option) => (
                    <label
                      key={option.Name}
                      className={`border border-gray-200 rounded-lg my-5 py-5 dark:border-gray-600 flex items-center align-middle cursor-pointer font-epilogue font-semibold text-[20px] break-all truncate ${
                        selectedOption === option.Name
                          ? " bg-[#ffffff] "
                          : " bg-inherit text-white "
                      }`}
                    >
                      <input
                        type="radio"
                        value={option.Name}
                        checked={selectedOption === option.Name}
                        onChange={() => setSelectedOption(option.Name)}
                      />
                      {option.Name}
                    </label>
                  ))}
                  <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                    <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                      Your vote speaks for you
                    </h4>
                    <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                      Cast your vote, just because it speaks louder than your
                      voice.
                    </p>
                  </div>
                  <div className={`flex justify-center items-center`}>
                    <button
                      type="button"
                      className={`font-epilogue bg-[#1dc071] font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px]`}
                      onClick={handleCastVote}
                      disabled={!selectedOption}
                    >
                      Cast Vote
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
              <p className="mt-[20px]  font-epilogue font-bold leading-[22px] text-white">
                your vote has been casted
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VoteDetails;
