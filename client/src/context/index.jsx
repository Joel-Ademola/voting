import react, { useCallback, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const Context = react.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  // console.log(
  //   "provider",
  //   provider,
  //   " signer",
  //   signer,
  //   "transactionsContract",
  //   transactionsContract
  // );

  return transactionsContract;
};

export const Provider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formState, setFormData, option, setOption] = useState({
    creator: "",
    title: "",
    description: "",
    options: [""],
    deadline: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [VoteCount, setVoteCount] = useState(localStorage.getItem("VoteCount"));
  const [votes, setVotes] = useState();
  // const {  value } = e.target;
  const handleChanges = (e, name) => {
    // const {  value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };
  const getAllVotes = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const transactionsContract = getEthereumContract();
      const availableVotes = await transactionsContract.getAllVotes();
      // console.log("availableVotes", availableVotes);
      const structuredVotes = availableVotes.map((vote, i) => ({
        Image: vote.image,
        Creator: vote.owner,
        Title: vote.title,
        Description: vote.description,
        Deadline: vote.deadline.toNumber(),
        // Deadline: vote.deadline,
        pid: i,
        Voters: vote.voters,
        // Vote: vote.vote.toString(),
        Options: vote.options.map((option) => ({
          Name: option.name,
          Votes: option.voteCount.toNumber(),
        })),
      }));
      setVotes(structuredVotes);

      return structuredVotes;
    } catch (error) {
      alert("error");
      // console.log(error);
    }
  };
  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      // console.log("accounts", accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllVotes();
      } else {
        window.location.href("/");
        // console.log(currentAccount);
        alert("No accounts found");
      }
    } catch (error) {
      alert("error");
    }
  }, []);

  const checkIfVoteExist = async () => {
    try {
      const transactionsContract = getEthereumContract();
      const VoteCount = await transactionsContract.getVoteCount();
      window.localStorage.setItem("VoteCount", VoteCount);
    } catch (error) {
      // console.log(error);

      alert("No ethereum object");
      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      //   window.location.reload();
    } catch (error) {
      // console.log(error);

      alert("No ethereum object");
      throw new Error("No ethereum object");
    }
  };

  const createVote = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const { title, description, deadline, image, options } = formState;
      const creator = currentAccount;
      //   console.log("creator", creator); // Log the current account
      const parsedDeadline = new Date(deadline).getTime();
      const transactionsContract = getEthereumContract();
      const transactionsHash = await transactionsContract.createVote(
        creator,
        title,
        description,
        parsedDeadline,
        image,
        options
      );
      setIsLoading(true);
      console.log(`Loading - ${transactionsHash.hash}`);
      await transactionsHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionsHash.hash}`);

      const VoteCount = await transactionsContract.getVoteCount();
      setVoteCount(VoteCount.toNumber());
    } catch (error) {
      alert("ERROR when creating vote");
      // console.log(error);
    }
  };

  const castVote = async (pid, option) => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const transactionsContract = getEthereumContract();
      const transactionsHash = await transactionsContract.castVote(pid, option);
      setIsLoading(true);
      // console.log(`Loading - ${transactionsHash.hash}`);
      await transactionsHash.wait();
      setIsLoading(false);
      alert(`Success - ${transactionsHash.hash}`);
      // return transactionsHash;
    } catch (error) {
      alert("error casting vote");
      // console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfVoteExist();
  }, [checkIfWalletIsConnected]);

  return (
    <Context.Provider
      value={{
        getEthereumContract,
        checkIfWalletIsConnected,
        connectWallet,
        currentAccount,
        contractAddress,
        formState,
        handleChanges,
        setFormData,
        createVote,
        getAllVotes,
        isLoading,
        setIsLoading,
        castVote,
        // getVotes,
        // getVoters,
        VoteCount,
        votes,
      }}
    >
      {children}
    </Context.Provider>
  );
};
