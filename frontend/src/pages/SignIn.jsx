import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";
export default function SignIn() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  let signIn = async (e) => {
    try {
      e.preventDefault();
      setError(null);
      let data = {
        email,
        password,
      };
      let res = await axios.post("/api/users/login", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setError(e.response.data.error);
    }
  };
  return (
    <div className="mt-24">
      <div className="w-full max-w-lg mx-auto h-screen ">
        <form
          onSubmit={signIn}
          action="#"
          method="POST"
          className="space-y-6 p-5 border border-primary border-3 rounded-md"
        >
          <h1 className="text-center font-bold text-primary text-2xl">
            Sign In form
          </h1>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {!!error && (
                <p className="text-red-600 text-sm italic">{error}</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={"/sign-up"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Register here
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>{" "}
    </div>
  );
}
