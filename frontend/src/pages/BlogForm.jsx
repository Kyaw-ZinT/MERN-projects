import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import axios from "../helpers/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogForm() {
  let [categories, setCategories] = useState([]);
  let [newCategories, setNewCategories] = useState("");
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [errors, setErrors] = useState([]);
  let navigate = useNavigate();
  let { id } = useParams();

  let addCategories = () => {
    setCategories((prev) => [newCategories, ...prev]);
    setNewCategories("");
  };

  let addBook = async (e) => {
    try {
      e.preventDefault();
      let book = {
        title,
        description,
        categories,
      };
      let res;
      if (id) {
        res = await axios.patch("/api/books/" + id, book);
      } else {
        res = await axios.post("/api/books", book);
      }

      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      setErrors(Object.keys(e.response.data.errors));
    }
  };

  useEffect(() => {
    let editBook = async () => {
      if (id) {
        let res = await axios.get("/api/books/" + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setCategories(res.data.categories);
        }
      } else {
        setTitle("");
        setDescription("");
        setCategories([]);
      }
    };
    editBook();
  }, [id]);

  return (
    <div className="h-screen">
      <div className="mx-auto max-w-md  space-y-5 border-2 border-white-[500] p-4 rounded-md mt-20">
        <h1 className="font-bold text-primary text-center text-xl">
          Book Create Form
        </h1>

        <form action="" className="space-y-3 " onSubmit={addBook}>
          {errors && (
            <p className="text-red-500 text-sm italic pl-2">{errors}</p>
          )}

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Book title"
            className="w-full text-gray-700 bg-gray-200 border border-3 border-gray-200 rounded-lg  p-1 focus:outline-none focus:bg-white focus:border-gray-500 leading-tight"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Book description"
            className="w-full border border-3  border-gray-200 bg-gray-200 text-gray-700 rounded-lg p-1 focus:outline-none focus:border-gray-500 focus:bg-white"
            rows={5}
          />

          <div className="flex items-center gap-2">
            <input
              value={newCategories}
              onChange={(e) => setNewCategories(e.target.value)}
              type="text"
              placeholder="Book ingredients"
              className="w-full border border-3  border-gray-200 rounded-lg bg-gray-200 text-gray-700  p-1 focus:outline-none focus:bg-white focus:border-gray-500 "
            />

            <button
              type="button"
              onClick={addCategories}
              className="bg-primary text-white rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-row ">
            <Categories categories={categories} />
          </div>

          <button
            type="submit"
            className="px-2 py-1 text-white rounded-full bg-primary w-full font-bold text-lg hover:bg-blue-700 hover:text-yellow-300 "
          >
            Create Book
          </button>
        </form>
      </div>
    </div>
  );
}
