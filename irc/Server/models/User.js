const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  nicknames: [{ type: mongoose.Schema.Types.ObjectId, ref: "Nickname" }],
});

module.exports = mongoose.model("User", UserSchema);
