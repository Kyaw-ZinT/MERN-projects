import React, { useEffect, useState } from "react";
import axios from "../helpers/axios";
import { useParams } from "react-router-dom";
import ShowBook from "../components/ShowBook";
export default function BookDetail() {
  let { id } = useParams();
  let [book, setBook] = useState(null);

  useEffect(() => {
    let BookFedch = async () => {
      let response = await axios.get("/api/books/" + id);
      if (response.status === 200) {
        setBook(response.data);
      }
    };
    BookFedch();
  }, [id]);

  return <div>{book && <ShowBook book={book} />}</div>;
}
