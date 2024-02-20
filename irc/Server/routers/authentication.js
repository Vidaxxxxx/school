const express = require("express");

const router = express.Router();

const validateFormData = require("../controllers/authentication/validateFormData");
const registerUser = require("../controllers/authentication/registerUser");
const checkPassword = require("../controllers/authentication/checkPassword");
const retrieveUserData = require("../controllers/authentication/retrieveUserData");
const createJWT = require("../controllers/authentication/createJWT");
const dotenv = require("dotenv");
dotenv.config();

router.post(
  "/login",
  validateFormData,
  retrieveUserData,
  checkPassword,
  createJWT
);

router.post("/signup", validateFormData, registerUser);

module.exports = router;
