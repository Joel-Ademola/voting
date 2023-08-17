import React, { useState, useContext } from "react";
import { Navbar, Loader, HomeButton } from "../components";
import { Context } from "../context/index.jsx";
const BackHome = () => {
  const { currentAccount } = useContext(Context);
  const isLoading = true;

  if (currentAccount === "") {
    return (
      <div className="gradient-bg-welcome min-h-screen">
        <Navbar />
        <div className="min-h-screen h-0 flex justify-center">
          <div className="flex flex-col justify-center items-center h-full">
            <h1 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Please connect your wallet
              <HomeButton />
              {isLoading && <Loader />}
            </h1>
          </div>
        </div>
      </div>
    );
  }
};

export default BackHome;
