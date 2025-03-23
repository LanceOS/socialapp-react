import React, { useContext, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import UserContext from "../lib/contexts/UserContext";

const Nav = () => {
  const { user, logout }: any = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <header className="border-2 w-full md:w-1/4 flex md:flex-col items-center py-8">
      <nav className="flex flex-col justify-between items-center h-full">
        <div className="">
          <p>Placeholder</p>
        </div>
        <div className="flex gap-2">
          {!user ? (
            <>
              <button
                className="cursor-pointer rounded-lg bg-base-300 py-2 px-4"
                aria-label="Go to sign in page"
                onClick={() => navigate("/signin")}
              >
                Sign In
              </button>
              <button
                className="cursor-pointer rounded-lg bg-[#05083d] text-white py-2 px-4"
                aria-label="Create new Account"
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <button
              className="cursor-pointer rounded-lg bg-[#05083d] text-white py-2 px-4"
              aria-label="Create new Account"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Signout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
