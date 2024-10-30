const express = require("express");
const app = express();
const morgan = require("morgan");
const bookRoutes = require("./routes/books");
const userRoutes = require("./routes/users");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

const mongoURL =
  "mongodb+srv://kyawzintun:test1234@cluster0.vrhdr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURL).then(() => {
  console.log("conneted to db");

  app.listen(process.env.PORT, () => {
    console.log("app is running on port " + process.env.PORT);
  });
});

app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

app.use(bookRoutes);
app.use(userRoutes);

app.get("/set-cookie", (req, res) => {
  res.cookie("name", "aung");
  return res.send("cookie already set");
});

app.get("/get-cookie", (req, res) => {
  let cookies = req.cookies;
  return res.json(cookies);
});
