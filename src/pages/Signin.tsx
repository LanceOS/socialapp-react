import React, { useContext, useState } from "react";
import UserContext from "../lib/contexts/UserContext";

const Signin = () => {
  const { login }: any = useContext(UserContext);

  const [validations, setValidations] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValidations((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  function signIn(event: any) {
    event.preventDefault();
    login(validations)
      .then((user) => {
        console.log("Logged in user:", user);
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  }

  return (
    <main className="h-screen mx-auto flex flex-col py-12 px-4 gap-4 items-center justify-center">
      <h1 className="text-2xl sm:text-4xl font-bold">React App</h1>
      <form
        className="bg-white w-full sm:w-xl flex flex-col gap-12 items-center px-8 py-16 rounded-lg"
        onSubmit={signIn}
      >
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2 bg-gray-200 py-2 px-4">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              aria-label="Enter your email"
              placeholder="example@example.com"
              onChange={(e) => handleChange(e)}
              className="focus:outline-0"
            />
          </div>
          <div className="flex flex-col gap-2 bg-gray-200 py-2 px-4">
            <label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              aria-label="Enter your password"
              onChange={(e) => handleChange(e)}
              className="focus:outline-0"
            />
          </div>
        </div>
        <button
          type="submit"
          aria-label="Sign In"
          className="curosr-pointer w-full text-white bg-black rounded-md text-xl py-4"
        >
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Signin;
