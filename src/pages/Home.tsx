import React from "react";
import Nav from "../components/Nav";
import CreatePost from "../components/CreatePost";

const Home = () => {
  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto text-base-content">
      <Nav />
      <main className="border-2 min-h-screen w-full flex">
        <div className="w-full">
          <CreatePost />
        </div>
        <div className="w-1/4"></div>
      </main>
    </div>
  );
};

export default Home;
