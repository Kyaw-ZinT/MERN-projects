import React from "react";

export default function Categories({ categories }) {
  return (
    <div className="flex flex-wrap">
      {categories &&
        !!categories.length &&
        categories.map((category, i) => (
          <span
            key={i}
            className="px-2 py-2 text-white rounded-full bg-primary text-sm ml-2 mt-2"
          >
            {category}
          </span>
        ))}
    </div>
  );
}
