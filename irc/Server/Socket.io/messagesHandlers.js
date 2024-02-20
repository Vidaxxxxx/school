const Message = require("../models/Message");
const Channel = require("../models/Channel");
const User = require("../models/User");

module.exports = (io, socket) => {
  /**
   * Asynchronously creates a new message and saves it to the database.
   * Notifys all the sockets in the channel that a new message has been created
   * @fires new_message event
   *
   * @param {Object} data - an object containing the necessary data for creating the message
   * @return {Promise<void>} a promise that resolves once the message is saved to the database
   *
   * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
   */
  const createMessage = async function (data) {
    try {
      const newMessage = new Message({
        author: socket.userId,
        channel: data.channelId,
        content: data.message,
        timestamp: new Date(),
      });
      console.log(`New message created: ${newMessage}`);

      await newMessage.save();

      // Save message id in channel
      const channel = await Channel.findById(data.channelId);
      channel.messages.push(newMessage._id);
      await channel.save();

      console.log(
        `[messagesHandlers:createMessage] Message "${newMessage.content}" saved to MongoDB.`
      );

      // Emits a new_message event in the channel
      io.to(newMessage.channel.toHexString()).emit("new_message", newMessage);
      console.log(
        `[Socket.io] New message created: ${newMessage} in channel ${newMessage.channel}`
      );
    } catch (error) {
      console.error("Error saving message to MongoDB:", error.message);
    }
  };

  const getMessage = async function (messageId) {
    try {
      const message = await Message.findOne({ _id: messageId });
      console.log(message);
    } catch (error) {
      console.error("Error getting message from MongoDB:", error.message);
    }
  };

  const deleteMessage = async function (messageId) {
    try {
      const result = await Message.deleteOne({ _id: messageId });
      console.log(result);
    } catch (error) {
      console.error("Error deleting message from MongoDB:", error.message);
    }
  };

  const getAllMessages = async function () {
    try {
      const messages = await Message.find();
      socket.emit("all_messages_list", messages);
    } catch (error) {
      console.error("Error getting messages from MongoDB:", error.message);
    }
  };

  const getMessageAuthor = async function (message) {
    try {
      const user = await User.findById(message.author);

      // Emit a unique event dynamically created for this request
      io.to(socket.id).emit(`message_${message._id}_author`, user);
    } catch (error) {
      console.error(
        `Error getting message "${message.content}" author from MongoDB:`,
        error.message
      );
    }
  };

  socket.on("create_message", createMessage);
  socket.on("get_message", getMessage);
  socket.on("delete_message", deleteMessage);
  socket.on("get_all_messages", getAllMessages);
  socket.on("get_message_author", getMessageAuthor);
};
