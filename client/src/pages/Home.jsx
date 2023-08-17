import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Context } from "../context/index.jsx";
import { Navbar, Loader } from "../components";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

// import { TransactionContext } from "../context/TransactionContext";
// import { shortenAddress } from "../utils/shortenAddress";
// import { Loader } from ".";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);
const Home = () => {
  const { connectWallet, currentAccount, isLoading } = useContext(Context);
  return (
    <>
      <div className="gradient-bg-welcome min-h-screen">
        {currentAccount && <Navbar />}
        <div className="flex w-full justify-center items-center ">
          <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
            <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
              <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
                Blockchain Vote <br /> across the world
              </h1>
              <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
                Explore the Blockchain world. Create and Cast vote easily on
                this platform.
              </p>
              {!currentAccount && (
                <button
                  type="button"
                  onClick={connectWallet}
                  className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
                >
                  <AiFillPlayCircle className="text-white mr-2" />
                  <p className="text-white text-base font-semibold">
                    Connect Wallet
                  </p>
                </button>
              )}

              <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
                  Reliability
                </div>
                <div className={companyCommonStyles}>Security</div>
                <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
                  Ethereum
                </div>
                <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
                  Web 3.0
                </div>
                <div className={companyCommonStyles}>Low Fees</div>
                <div className={`rounded-br-2xl ${companyCommonStyles}`}>
                  Blockchain
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
              <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
                <div className="flex justify-between flex-col w-full h-full">
                  <div className="flex justify-between items-start">
                    <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                      <SiEthereum fontSize={21} color="#fff" />
                    </div>
                    <BsInfoCircle fontSize={17} color="#fff" />
                  </div>
                  <div>
                    <p className="text-white font-light text-sm">
                      {"shortenAddress(currentAccount)"}
                    </p>
                    <p className="text-white font-semibold text-lg mt-1">
                      Ethereum
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              type="text"
              handleChange={'handleChange'}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              handleChange={'handleChange'}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              handleChange={'handleChange'}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              handleChange={'handleChange'}
            />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>
            )}
          </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center items-center gradient-bg-services">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
              Services that we
              <br />
              continue to improve
            </h1>
            <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
              The best choice for creating and casting vote, with
              the various super friendly services we offer
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-start items-center">
            <ServiceCard
              color="bg-[#2952E3]"
              title="Security gurantee"
              icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
              subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            />
            <ServiceCard
              color="bg-[#8945F8]"
              title="Best exchange rates"
              icon={<BiSearchAlt fontSize={21} className="text-white" />}
              subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            />
            <ServiceCard
              color="bg-[#F84550]"
              title="Fastest transactions"
              icon={<RiHeart2Fill fontSize={21} className="text-white" />}
              subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
