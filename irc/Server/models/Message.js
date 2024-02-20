const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", MessageSchema);
