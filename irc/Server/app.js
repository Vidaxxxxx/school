const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

// JWT Token
const passport = require("passport");
const passportJwt = require("passport-jwt");
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const bodyParser = require("body-parser");

// Routers
const authenticationRouter = require("./routers/authentication");
const channelRouter = require("./routers/channel");

dotenv.config();

const app = express();

app.use(cors());

app.use(morgan("tiny"));

app.use(express.json());

app.use("/auth", authenticationRouter);
app.use("/channel", channelRouter);

module.exports = app;
