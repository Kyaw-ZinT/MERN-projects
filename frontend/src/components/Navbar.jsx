import React, { useContext } from "react";
import { Link } from "react-router-dom";
import lightIcon from "../assets/light.svg";
import darkIcon from "../assets/dark.svg";
import { ThemeContext } from "../contexts/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  let { changeTheme, isDark } = useContext(ThemeContext);
  let { name } = useContext(AuthContext);
  console.log(name);
  return (
    <div>
      <nav
        className={`p-5 flex items-center justify-between  border border-b-5 fixed top-0 w-full bg-white ${
          isDark ? "bg-dbg text-white" : ""
        }`}
      >
        <ul className="flex space-x-20 items-center ">
          <li className="flex items-center gap-2">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="outline-none rounded-md pl-2"
            />
          </li>
          <li className=" flex items-center gap-2 -ml-32">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-primary hidden md:block ">
              Blogs Box
            </h1>
          </li>

          <li className="font-semibold hover:text-primary">
            <Link>Home</Link>
          </li>

          <li className="flex place-items-center gap-2">
            <button className="px-3 flex items-center gap-1 py-2 bg-primary text-white rounded-2xl text-md font-bold">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </div>
              <Link to={"/blogForm"} className="hidden md:block">
                Blog Form
              </Link>{" "}
            </button>
            <div className="w-10">
              <img src="/image.jpg" alt="" className="w-full rounded-full" />
            </div>
          </li>

          <li>
            <Link to={"/sign-in"}>Login</Link>
          </li>
          <li>
            <Link to={"/sign-up"}>Register</Link>
          </li>

          <li className="flex items-center gap-1">
            {isDark && (
              <img
                src={lightIcon}
                alt=""
                onClick={() => changeTheme("light")}
              />
            )}{" "}
            {!isDark && (
              <img src={darkIcon} alt="" onClick={() => changeTheme("dark")} />
            )}{" "}
          </li>
        </ul>
      </nav>
    </div>
  );
}
