const express = require("express");
const BookController = require("../controllers/BookController");
const { body } = require("express-validator");
const handleErrorMessage = require("../middleware/handleErrorMessage");
const router = express.Router();

router.get("/api/books", BookController.index);
router.post(
  "/api/books",
  [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("categories").notEmpty().isArray({ min: 3 }),
  ],
  handleErrorMessage,
  BookController.store
);
router.get("/api/books/:id", BookController.show);
router.delete("/api/books/:id", BookController.destroy);
router.patch("/api/books/:id", BookController.update);

module.exports = router;
