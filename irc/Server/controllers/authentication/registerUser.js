const bcrypt = require("bcrypt");
const User = require("../../models/User");

async function registerUser(req, res) {
  try {
    const username = req.body.username.toLowerCase();
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      username: username,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("User registered successfully.");
    res.status(201).json({ message: "User registered successfully." }).send();
  } catch (error) {
    console.log("Registration failed:", error);
    res.status(500).json({ error: "Registration failed" }).send();
  }
}

module.exports = registerUser;
