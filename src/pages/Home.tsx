import React, { useContext, useEffect } from "react";
import Nav from "../components/Nav";
import CreatePost from "../components/CreatePost";
import UserContext from "../lib/contexts/UserContext";

const Home = () => {
  const { user, loading }: any = useContext(UserContext);

  return (
    <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto text-base-content">
      <Nav />
      <main className="border-2 min-h-screen w-full flex">
        <div className="w-full">
          {!loading ? (
            user ? (
              <CreatePost user={user} />
            ) : (
              <section>
                <p>Signin to create post</p>
              </section>
            )
          ) : (
            <section>
              <p>Loading...</p>
            </section>
          )}
        </div>
        <div className="w-1/4"></div>
      </main>
    </div>
  );
};

export default Home;
