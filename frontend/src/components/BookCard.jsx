import React from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import trashIcon from "../assets/trash.svg";
import editIcon from "../assets/edit.svg";
import axios from "../helpers/axios";

export default function BookCard({ books, onDeleted }) {
  let { isDark } = useContext(ThemeContext);
  let deleteBook = async (e, _id) => {
    e.preventDefault();
    let response = await axios.delete("/api/books/" + _id);
    if (response.status === 200) {
      onDeleted(_id);
    }
  };

  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 ">
        {!!books.length &&
          books.map((book) => (
            <Link
              to={`/books/${book._id}`}
              key={book._id}
              className={`p-4 border border-3 border-gray-400 rounded-lg font-semibold space-y-3 shadow-xl ${
                isDark ? "bg-dcard text-white" : ""
              }`}
            >
              <h1>{book.title}</h1>

              <p>{book.description}</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi unde tenetur eos soluta laboriosam perspiciatis
                eligendi sed asperiores deleniti aliquid.
              </p>
              <div className="flex items-center justify-between">
                <div className="my-2 flex flex-wrap max-w-40">
                  {!!book.categories.length &&
                    book.categories.map((categorie, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full bg-primary text-white text-sm m-1"
                      >
                        {categorie}
                      </span>
                    ))}
                </div>
                <div className="flex items-center gap-2">
                  <Link to={`books/edit/${book._id}`}>
                    <img src={editIcon} alt="" />
                  </Link>
                  <img
                    src={trashIcon}
                    alt=""
                    onClick={(e) => deleteBook(e, book._id)}
                  />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
