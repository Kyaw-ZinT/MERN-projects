import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

export default function Home() {
  let [books, setBooks] = useState([]);
  let [links, setLinks] = useState(null);
  let navigate = useNavigate();
  let location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  let page = searchParams.get("page");
  page = parseInt(page);

  useEffect(() => {
    let fetchBook = async () => {
      let response = await axios("/api/books?page=" + page);
      if (response.status === 200) {
        let data = response.data;
        setLinks(data.links);
        setBooks(data.data);

        window.scroll({ top: 0, left: 0, behavior: "smooth" });
      }
    };
    fetchBook();
  }, [page]);

  let onDeleted = (_id) => {
    if (books.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    } else {
      setBooks((prev) => prev.filter((b) => b._id !== _id));
    }
  };
  ``;

  return (
    <div>
      <div>
        <HeroSection />
        <BookCard books={books} onDeleted={onDeleted} />
      </div>

      <div>{!!links && <Pagination links={links} page={page || 1} />}</div>
    </div>
  );
}
