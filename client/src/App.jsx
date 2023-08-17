import React from "react";
import { Navbar, Footer, Voting, Services } from "./components";
import { Route, Routes } from "react-router-dom";
import { Home, CreateVote, Votes, VoteDetails } from "./pages";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* <div className="gradient-bg-welcome"><Navbar /></div> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-vote" element={<CreateVote />} />
        <Route path="/vote-list" element={<Votes />} />
        <Route path="/vote-details/:id" element={<VoteDetails />} />
        {/* <Route path="/profile" element={<Profile />} />
         */}
      </Routes>
      {/* <Services />
      <Voting />
      <Footer /> */}
      <Footer />
    </div>
  );
};

export default App;
