const Nickname = require("../models/Nickname");

module.exports = (io, socket) => {
  const addNickname = async function (data) {
    const { nickname, channelId } = data;
    const userId = socket.userId;

    try {
      let existingNickname = await Nickname.findOneAndUpdate(
        {
          user: userId,
          channel: channelId,
        },
        { nickname },
        { upsert: true, new: true }
      );

      socket.emit(`new_nickname_${channelId}`, existingNickname);
      console.log("Nickname added to MongoDB:", existingNickname);
    } catch (error) {
      console.error("Error adding nickname to MongoDB:", error.message);
    }
  };

  const getNickname = async function (data) {
    const { userId, channelId, messageId } = data;

    try {
      const nickname = await Nickname.findOne({
        user: userId,
        channel: channelId,
      });
      if (nickname) {
        socket.emit(`user_nickname_${messageId}`, nickname);
      } else {
        socket.emit(`user_nickname_${messageId}`, "");
      }
    } catch (error) {
      console.error("Error getting nickname from MongoDB:", error.message);
    }
  };

  socket.on("add_nickname", addNickname);
  socket.on("get_nickname", getNickname);
};
