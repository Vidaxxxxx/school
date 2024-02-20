const User = require("../../models/User");

/**
 * Asynchronously retrieves user data from the database by its username.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next middleware function
 * @return {void}
 *
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
async function retrieveUserData(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username }).exec();

    if (!user) {
      console.warn(`User not found: ${req.body.username}`);
      return res.status(401).json({ error: "Authentication failed." });
    }

    // Adds the user object to the request body for the other middlewares
    req.body.database = user;
  } catch (error) {
    console.error(`Error occurred while checking password: ${error}`);
    return res.status(500).json({ error: "Internal server error." });
  }
  next();
}

module.exports = retrieveUserData;
