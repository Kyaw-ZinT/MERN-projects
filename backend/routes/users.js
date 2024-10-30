const express = require("express");
const usersController = require("../controllers/UsersController");
const handleErrorMessage = require("../middleware/handleErrorMessage");
const { body } = require("express-validator");
const User = require("../models/User");
const router = express.Router();

router.post("/api/users/login", usersController.login);

router.post(
  "/api/users/register",
  [
    body("name").notEmpty(),
    body("email").notEmpty(),
    body("email").custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("E-mail already in use");
      }
    }),
    body("password").notEmpty(),
  ],
  handleErrorMessage,
  usersController.register
);

module.exports = router;
