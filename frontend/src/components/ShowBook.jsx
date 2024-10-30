import React from "react";
import Categories from "./Categories";

export default function ShowBook({ book }) {
  return (
    <div className="mt-20">
      {" "}
      <div className="space-y-4 flex flex-col items-center my-10 h-screen  ">
        <h1>{book.title}</h1>

        <p>{book.description}</p>

        <Categories categories={book.categories} />
      </div>
    </div>
  );
}
