import React, { useContext } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { shortenAddress } from "../utils/shortenAddress";
import { Context } from ".././context/index.jsx";

import logo from "../images/logo.png";

const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  const { checkIfWalletIsConnected, currentAccount } = useContext(Context);
  const [toggleMenu, setToggleMenu] = React.useState(false);

  return (
    <nav className="w-full bg-[#00000047] flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="w-32 cursor-pointer" />
        </Link>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        <li className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
          {" "}
          <Link to="/create-vote">Create Vote</Link>
        </li>
        <li className="text-white md:flex mx-10 hidden list-none flex-row justify-between items-center flex-initial">
          {" "}
          <Link to="/vote-list"> Votes</Link>
        </li>
        {["Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}

        <li className="bg-[#ffebeb] text-black font-bold py-2 px-7 mx-4 rounded-full cursor-default">
          {!checkIfWalletIsConnected()
            ? "Connect Wallet"
            : `${shortenAddress(currentAccount)}`}
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Create Vote", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavBarItem
                  key={item + index}
                  title={item}
                  classprops="my-2 text-lg"
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
