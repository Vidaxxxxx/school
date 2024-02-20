const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String },
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  private: { type: Boolean, default: false },
});

module.exports = mongoose.model("Channel", ChannelSchema);
