const Channel = require("../models/Channel");
const Message = require("../models/Message");
const User = require("../models/User");

module.exports = (io, socket) => {
  /**
   * Asynchronously creates a new channel in the database and emits
   * a new_channel_created event using Socket.IO.
   *
   * @param {Object} channel - the title of the channel to be created
   * @return {Promise} a Promise that resolves to the saved newChannel object
   *
   * @author [Elone MEIMOUN](https://github.com/ellidaan)
   */
  const createChannel = async function (channel) {
    // TODO: Use the JWT for user id
    try {
      const newChannel = new Channel({
        title: channel,
      });

      await newChannel.save();
      console.log("Channel saved to MongoDB");

      // Sends back the newly created channel data
      io.emit("new_channel_created", newChannel);
      console.log("New channel created: ", newChannel);
    } catch (error) {
      console.error("Error saving channel to MongoDB:", error.message);
    }
  };

  const createPrivateChannel = async function (data) {
    const { username, content } = data;
    console.log(`In createPrivateChannel: ${username} ${content}`);

    try {
      // Recupérer le destinataitre
      const destinataire = await User.findOne({ username });
      console.log(`Successfully retrieved user: ${destinataire}`);
      // Récupérer l'envoyeur
      const envoyeur = await User.findById({ _id: socket.userId });
      console.log(`Successfully retrieved user: ${envoyeur}`);

      // On essaye de trouver le channel de discussion privé si jamais il existe
      let targetChannel = await Channel.findOne({
        private: true,
        users: {
          $all: [socket.userId, destinataire._id],
        },
      });

      // Scénario 1 : le channel n'existe pas encore (null)
      if (!targetChannel) {
        console.log("Private channel does not exist");
        // On crée le channel
        const newPrivateChannel = new Channel({
          title: `private-${envoyeur.username}-${destinataire.username}`,
          users: [socket.userId, destinataire._id],
          private: true,
        });

        console.log("New private channel created: ", newPrivateChannel);

        targetChannel = await newPrivateChannel.save();

        if (content) {
          // On ajoute le message privé au channel privé
          const newPrivateMessage = await new Message({
            author: socket.userId,
            channel: targetChannel._id,
            content: content,
          }).save();

          console.log("New private message created: ", newPrivateMessage);

          // On ajoute le message maintenant qu'il possède un ID
          targetChannel.messages.push(newPrivateMessage._id);
          targetChannel.save();
        }

        // Comme le channel n'existe pas encore, on l'envoie au destinataire
        socket.emit("new_private_channel", targetChannel);
        console.log("Emit new_private_channel");
        return;
      }

      // Scénario 2 : le channel existe
      console.log("Private channel already exists");
      if (content) {
        const newPrivateMessage = await new Message({
          author: socket.userId,
          channel: targetChannel._id,
          content: content,
        }).save();
        console.log("New private message created: ", newPrivateMessage);

        // On ajoute le message privé au channel privé
        targetChannel.messages.push(newPrivateMessage._id);
        targetChannel = await targetChannel.save();
        console.log("Channel saved to MongoDB");

        // On envoi le message
        io.to(targetChannel._id).emit("new_private_message", newPrivateMessage);
        console.log("Emit new_private_message");
      }
    } catch (error) {
      console.error("Error while sending private message :", error.message);
    }
  };

  const renameChannel = async function (channel) {
    try {
      const result = await Channel.updateOne({ title: channel });
      console.log(result);
    } catch (error) {
      console.error("Error renaming channel in MongoDB:", error.message);
    }
  };

  const getChannel = async function (channel) {
    try {
      const foundChannel = await Channel.findOne({ title: channel });
      console.log(foundChannel);
    } catch (error) {
      console.error("Error getting channel from MongoDB:", error.message);
    }
  };

  /**
   * Asynchronously deletes a channel by its ID.
   * emits a channnel_deleted event
   *
   * @param {ObjectID} channel - The ID of the channel to be deleted
   * @return {Promise} A Promise containing the result of the deletion operation
   */
  const deleteChannel = async function (channel) {
    try {
      const result = await Channel.deleteOne({ title: channel });
      console.log(`Channel "${channel}" deleted from MongoDB:`, result);
      socket.emit("channel_deleted", channel);
    } catch (error) {
      console.error("Errore deleting channel from MongoDB:", error.message);
    }
  };

  /**
   * A function to remove a user from a channel.
   *
   * @param {string} channelTitle - the title of the channel
   * @return {Promise} a Promise that resolves with the updated document, or undefined if the channel is not found or the user is not removed
   */
  const leaveChannel = async function (channelTitle) {
    try {
      const result = await Channel.findOneAndUpdate(
        { title: channelTitle },
        { $pull: { users: socket.userId } },
        { new: true } // Return the updated document
      );

      if (!result) {
        console.log("Channel not found or user not removed.");
        return;
      }

      console.log("User removed from members in MongoDB:", result);

      if (socket) {
        const user = await User.findById(socket.userId);
        console.log(`Retriving user ${socket.userId} from MongoDB`);

        if (!user) {
          console.log("User not found.");
          return;
        }

        io.emit(`channel_${result._id}_left`, user);
        socket.to(socket.id).emit("channel_left", result._id);
        socket.leave(result._id);
      } else {
        console.log("Socket not provided.");
      }
    } catch (error) {
      console.error("Error removing user from members in MongoDB:", error);
    }
  };

  /**
   * Async function to get all channels from MongoDB and emit them using socket.io
   *
   * @return {Promise<void>} Promise that resolves when all channels are emitted
   *
   * @author [Elone MEIMOUN](https://github.com/ellidaan)
   */
  const getAllChannels = async function () {
    try {
      const allChannels = await Channel.find();
      socket.emit("all_channels_list", allChannels);
    } catch (error) {
      console.error("Error getting all channels from MongoDB:", error.message);
    }
  };

  /**
   * Asynchronous function that makes a user join a channel in the database
   * and joins the associated socket.io room.
   *
   * @param {Object} data - The data object containing channelId and userId
   * @return {Promise} A Promise resolving to the result of the update operation
   *
   * @author [Elone MEIMOUN](https://github.com/ellidaan)
   */
  const joinChannel = async function (channelName) {
    try {
      const joinedChannel = await Channel.findOneAndUpdate(
        { title: channelName },
        { $addToSet: { users: socket.userId } }
      );

      const user = await User.findOne({ _id: socket.userId });
      console.log(`Retrieved user ${user.username} from MongoDB.`);

      const channelId = joinedChannel._id;

      // Emits a user_joined event in all the sockets suscribed to this room

      // Informs the user that he joined the channel
      if (user) {
        io.emit(`channel_${channelId}_joined`, user);
      }
      socket.emit("channel_joined", joinedChannel);

      console.log(
        `[Socket.io] User ${socket.username} joined channel ${joinedChannel.title}`
      );
    } catch (error) {
      console.error("Error joining channel in MongoDB:", error.message);
    }
  };
  const usersList = async function (channelId) {
    try {
      const foundChannel = await Channel.findOne({ _id: channelId });

      console.log(`${socket.username} asked for ${channelId} user list.`);
      socket.emit("users_list", foundChannel.users);
    } catch (error) {
      console.error("Error getting channel from MongoDB:", error.message);
    }
  };

  const newUsersList = async function (channelId) {
    if (!channelId) {
      console.error("No channel ID provided.");
      return;
    }

    console.log(`In newUsersList: ${channelId}`);
    const channel = await Channel.findById(channelId);
    const usersList = await User.find({ _id: { $in: channel.users } });
    const usernamesList = usersList.map((user) => user.username);

    // Créer un user pour le server
    let newServer = new User({
      username: "server",
      password: "server",
    });

    // Essayer de récuprer le server si il existe déja
    let server = await User.findOne({ username: "server" });
    if (!server) {
      // Si le server n'existe pas, on le crée
      server = await newServer.save();
    }

    const responseString = usernamesList.map((username) => {
      return ` ${username}`;
    });

    response = new Message({
      content: `Here is the list of the users in this channel: ${responseString}`,
      channel: channelId,
      author: server._id,
    });

    console.log(responseString);

    io.to(socket.id).emit("new_message", response);
    console.log(response);
  };

  /**
   * Asynchronously retrieves messages for a given channel.
   * Emits a channel_messages_list event with the retrieved messages.
   *
   * @param {String} channelId - The ID of the channel to retrieve messages for.
   * @return {Promise} A Promise that resolves with the retrieved channel messages.
   *
   * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
   */
  const getChannelMessages = async function (channelId) {
    try {
      console.log(`Retrieving messages for channel ${channelId}.`);
      const foundChannel = await Channel.findById(channelId);
      console.log(foundChannel);

      const channelMessagesId = foundChannel.messages;

      if (!channelMessagesId) {
        socket.emit("channel_messages_list", []);
        return;
      }

      const messages = await Message.find({ _id: { $in: channelMessagesId } });

      socket.emit("channel_messages_list", messages);
    } catch (error) {
      console.error(
        `Error getting channel ${channelId} messages from MongoDB:`,
        error.message
      );
    }
  };

  const getChannelList = async function (data) {
    try {
      const allChannels = await Channel.find();
      const allChannelsTitles = allChannels.map((channel) => channel.title);
      let responseString = "";
      let response;

      let newServer = new User({
        username: "server",
        password: "server",
      });

      let server = await User.findOne({ username: "server" });
      if (!server) {
        server = await newServer.save();
      }

      if (!data.keyword) {
        console.log("[/list] No keyword provided. Getting all channels.");

        responseString = allChannelsTitles.map((title) => {
          return ` ${title}`;
        });

        response = new Message({
          content: `Here is the list of all channels: ${responseString}`,
          channel: data.channelId,
          author: server._id,
        });

        console.log(responseString);
      } else {
        console.log("Get all channels that contains the keyword", data.keyword);
        const filteredChannels = allChannelsTitles.filter((title) =>
          title.toLowerCase().includes(data.keyword.toLowerCase())
        );

        responseString = filteredChannels.map((title) => {
          return ` ${title}`;
        });

        response = new Message({
          author: server._id,
          content: `Here is the list of the channels that contains the keyword [${data.keyword}]: ${responseString}`,
          channel: data.channelId,
        });
      }

      io.to(socket.id).emit("new_message", response);
      console.log(response);
    } catch (error) {
      console.error("Error getting all channels from MongoDB:", error.message);
    }
  };

  const displayUserList = async function (channelId) {
    try {
      const foundChannel = await Channel.findById(channelId);
      const usersList = foundChannel.users;

      if (!usersList) {
        socket.emit("users_list", []);
        return;
      }

      const users = await User.find({ _id: { $in: usersList } });

      socket.emit("users_list", users);
    } catch (error) {
      console.error("Error getting channel from MongoDB:", error.message);
    }
  };

  socket.on("create_channel", createChannel);
  socket.on("get_channel", getChannel);
  socket.on("delete_channel", deleteChannel);
  socket.on("rename_channel", renameChannel);
  socket.on("get_all_channels", getAllChannels);
  socket.on("join_channel", joinChannel);
  socket.on("get_channel_users", newUsersList);
  socket.on("leave_channel", leaveChannel);
  socket.on("get_channel_messages", getChannelMessages);
  socket.on("get_channels_list", getChannelList);
  socket.on("display_user_list", displayUserList);
  socket.on("create_private", createPrivateChannel);
};
