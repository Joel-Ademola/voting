import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index.jsx";
import useFetch from "../hooks/useFetch.jsx";
import dummyData from "../utils/dummyData.js";
import { shortenAddress } from "../utils/shortenAddress.js";
import { Navbar, Loader, DisplayVotes, BackHome } from "../components/index.js";

// const TransactionsCard = ({
//   addressTo,
//   addressFrom,
//   timestamp,
//   message,
//   keyword,
//   amount,
//   url,
// }) => {
//   const gifUrl = useFetch({ keyword });

//   return (
//     <div
//       className="bg-[#181918] m-4 flex flex-1
//         2xl:min-w-[450px]
//         2xl:max-w-[500px]
//         sm:min-w-[270px]
//         sm:max-w-[300px]
//         min-w-full
//         flex-col p-3 rounded-md hover:shadow-2xl"
//     >
//       <div className="flex flex-col items-center w-full mt-3">
//         <div className="display-flex justify-start w-full mb-6 p-2">
//           <a
//             href={`https://ropsten.etherscan.io/address/${addressFrom}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <p className="text-white text-base">From: {addressFrom}</p>
//           </a>
//           <a
//             href={`https://ropsten.etherscan.io/address/${addressTo}`}
//             target="_blank"
//             rel="noreferrer"
//           >
//             <p className="text-white text-base">To: {addressTo}</p>
//           </a>
//           <p className="text-white text-base">Amount: {amount} ETH</p>
//           {message && (
//             <>
//               <br />
//               <p className="text-white text-base">Message: {message}</p>
//             </>
//           )}
//         </div>
//         <img
//           src={gifUrl || url}
//           alt="nature"
//           className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
//         />
//         <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
//           <p className="text-[#37c7da] font-bold">{timestamp}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

const Votes = () => {
  const {
    currentAccount,
    contractAddress,
    getAllVotes,
    setIsLoading,
    isLoading,
  } = useContext(Context);
  const [availableVotes, setAvailableVotes] = useState([]);

  const fetchVotes = async () => {
    setIsLoading(true);
    const data = await getAllVotes();
    setAvailableVotes(data);
    setIsLoading(false);
  };
  useEffect(() => {
    if (contractAddress) fetchVotes();
  }, [currentAccount, contractAddress]);
  if (currentAccount === "") {
    return (
      <>
        <BackHome />;
        <div className="gradient-bg-welcome min-h-screen">
          {isLoading && <Loader />}
          <Navbar />
          <div className="w-full h-[410px] object-cover rounded-xl">
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Please connect your wallet
              </h1>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <DisplayVotes
      title="All Votes"
      isLoading={isLoading}
      vote={availableVotes}
    />
  );
};

export default Votes;
