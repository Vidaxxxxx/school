const Channel = require("../models/Channel");

module.exports = (io, socket) => {
  socket.auth = false;

  const verifyJWT = async (token) => {
    const jwt = require("jsonwebtoken");
    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        socket.auth = false;
        socket.emit("authentication_error", err.message);
      } else {
        socket.auth = true;
        socket.userId = decoded.data._id;
        socket.username = decoded.data.username;

        console.log(
          `[Socket.io] Authenticated user: ${socket.username} #${socket.userId} on socket #${socket.id}`
        );
      }
    });
  };

  /**
   * Join channels that the user is a member of by finding the channel IDs associated with the user ID and joining the corresponding sockets to those channels.
   *
   * @param {} - No parameters
   * @return {Promise} - A promise that resolves once all the channels the user is a member of have been joined
   *
   * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
   */
  const joinChannelsUserIsMemberOf = async () => {
    const userId = socket.userId;
    try {
      const userChannels = await Channel.find({ users: userId });

      for (const channel of userChannels) {
        socket.join(channel._id.toHexString());
        console.log(
          `User ${socket.username} joined room ${channel._id.toHexString()}`
        );
      }
    } catch (error) {
      console.error(
        `Error getting user ${userId} channels from MongoDB:`,
        error.message
      );
    }
  };

  setTimeout(() => {
    // If the authentication failed, disconnect socket
    if (!socket.auth) {
      console.log("Unauthorized: Disconnecting socket ", socket.id);
      return socket.disconnect("unauthorized");
    }
    return socket.emit("authorized");
  }, 60000);

  socket.on("authenticate", (token) => {
    verifyJWT(token);
    joinChannelsUserIsMemberOf();
  });
};
