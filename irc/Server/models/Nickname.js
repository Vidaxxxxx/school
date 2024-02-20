const mongoose = require("mongoose");

const NicknameSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
});

module.exports = mongoose.model("Nickname", NicknameSchema);
