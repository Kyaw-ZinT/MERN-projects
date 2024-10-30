import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function SignUp() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [errors, setErrors] = useState(null);
  let navigate = useNavigate();
  let register = async (e) => {
    try {
      e.preventDefault();
      setErrors(null);
      let data = {
        name,
        email,
        password,
      };
      let res = await axios.post("/api/users/register", data, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setErrors(e.response.data.errors);
    }
  };

  return (
    <div className="mt-24 ">
      <div className="w-full max-w-lg mx-auto h-screen ">
        <form
          onSubmit={register}
          action="#"
          method="POST"
          className="space-y-6 p-5 border border-primary border-3 rounded-md"
        >
          <h1 className="text-center font-bold text-primary text-2xl">
            Sign Up form
          </h1>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                type="name"
                required
                autoComplete="name"
                className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {!!(errors && errors.name) && (
                <p className="text-sm text-red-600 italic">{errors.name.msg}</p>
              )}
            </div>
          </div>

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
              {!!(errors && errors.email) && (
                <p className="text-sm text-red-600 italic">
                  {errors.email.msg}
                </p>
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
                  to={"/sign-in"}
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Login here
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
              {!!(errors && errors.password) && (
                <p className="text-sm text-red-600 italic">
                  {errors.password.msg}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
