const User = require("../models/User");
const Channel = require("../models/Channel");

module.exports = (io, socket) => {
  const getUserChannels = async function () {
    const userId = socket.userId;
    try {
      const channelsList = await Channel.find({
        users: userId,
        private: false,
      });
      socket.emit("user_channels_list", channelsList);
    } catch (error) {
      console.error(
        `Error getting user ${userId} channels from MongoDB:`,
        error.message
      );
    }
  };

  const getPrivateChannels = async function () {
    const userId = socket.userId;
    try {
      const channelsList = await Channel.find({
        users: userId,
        private: true,
      });
      socket.emit("private_channels_list", channelsList);
    } catch (error) {
      console.error(
        `Error getting user ${userId} private channels from MongoDB:`,
        error.message
      );
    }
  };

  const getAllUsers = async function () {
    try {
      const allUsers = await User.find();
      socket.emit("all_users_list", allUsers);
    } catch (error) {
      console.error("Error getting all users from MongoDB:", error.message);
    }
  };

  socket.on("get_user_channels", getUserChannels);
  socket.on("get_all_users", getAllUsers);
  socket.on("get_user_private_channels", getPrivateChannels);
};
