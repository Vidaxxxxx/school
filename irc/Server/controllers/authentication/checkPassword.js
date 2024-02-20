const mongoose = require("mongoose");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

class PasswordException extends Error {
  constructor(message) {
    super(message);
    this.name = "PasswordException";
  }
}

/**
 * Middleware function to check the password provided in the request body.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {void}
 *
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
async function checkPassword(req, res, next) {
  try {
    const isMatch = await bcrypt.compare(
      req.body.password,
      req.body.database.password
    );

    if (!isMatch) {
      throw new PasswordException("Password does not match");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }

  next();
}

module.exports = checkPassword;
