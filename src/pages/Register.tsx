import React, { useContext, useState } from "react";
import UserContext from "../lib/contexts/UserContext";

const Register = () => {
  const { createUser }: any = useContext(UserContext);

  const [validations, setValidations] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setValidations((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const [formState, setFormState] = useState(1);

  async function register(event: any) {
    event.preventDefault();

    if (formState === 1) {
      setFormState(formState + 1);
    }

    await createUser(validations);
  }

  return (
    <main className="min-h-screen mx-auto flex flex-col gap-8 px-6 py-6 justify-center items-center">
      <h1 className="text-2xl sm:text-4xl font-bold">Created New Account</h1>
      <form
        className="bg-white w-full sm:w-xl flex flex-col gap-12 items-center px-8 py-16 rounded-lg"
        onSubmit={register}
      >
        <div className="flex flex-col gap-6 w-full">
          <div className="py-2 px-4 bg-gray-200 flex flex-col">
            <label htmlFor="username mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              aria-label="Enter your email"
              value={validations.username}
              onChange={(e) => handleChange(e)}
              placeholder="johndoe1234"
              className="focus:outline-0"
            />
          </div>
          <div className="py-2 px-4 bg-gray-200 flex flex-col">
            <label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              aria-label="Enter your email"
              onChange={(e) => handleChange(e)}
              placeholder="example@gmail.com"
              className="focus:outline-0"
            />
          </div>
          <div className="py-2 px-4 bg-gray-200 flex flex-col">
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
          <div className="py-2 px-4 bg-gray-200 flex flex-col">
            <label htmlFor="passwordConfirm">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="passwordConfirm"
              aria-label="Retype your password"
              onChange={(e) => handleChange(e)}
              className="focus:outline-0"
            />
          </div>
        </div>
        <button
          type="submit"
          aria-label="Register you account"
          className="cursor-pointer w-full rounded-md bg-black text-white py-4 text-xl"
        >
          Register
        </button>
      </form>
    </main>
  );
};

export default Register;
