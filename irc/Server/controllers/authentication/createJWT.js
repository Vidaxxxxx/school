const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

/**
 * Creates a JSON Web Token (JWT) based on the email and password from the request body,
 * and sends it as a JSON response.
 *
 * @param {Object} req - the request object
 * @param {Object} res - the response object
 * @param {Function} next - the next function in the middleware chain
 * @return {Object} the JSON response containing the JWT token
 *
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
function createJWT(req, res) {
  const jwtSecret = process.env.JWT_SECRET;

  const token = jwt.sign(
    {
      data: req.body.database,
    },
    jwtSecret,
    {
      issuer: "localhost",
      audience: "localhost",
      expiresIn: "1h",
    }
  );

  res.status(200).json({ token });
}

module.exports = createJWT;
