export default function sendAppropriateCommand(socket, command, argsObject) {
  switch (command) {
    // NICKNAME [NEW_NICKNAME]
    case "/nick":
      socket.emit("add_nickname", argsObject.arg);
      console.log(`/nick ${argsObject.arg}`);
      break;
    // LIST or LIST [CHANNEL]
    case "/list":
      socket.emit("get_channels_list", argsObject);
      console.log(`/list ${argsObject.arg ? argsObject.keyword : "all"}`);
      break;
    // CREATE [CHANNEL TITLE]
    case "/create":
      socket.emit("create_channel", argsObject.arg);
      console.log(`/create ${argsObject.arg}`);
      break;
    // DELETE [CHANNEL TITLE]
    case "/delete":
      socket.emit("delete_channel", argsObject.arg);
      console.log(`/delete ${argsObject.arg}`);
      break;
    // JOIN [CHANNEL TITLE]
    case "/join":
      socket.emit("join_channel", argsObject.arg);
      console.log(`/join ${argsObject.arg}`);
      break;
    // QUIT [CHANNEL TITLE]
    case "/quit":
      socket.emit("leave_channel", argsObject.arg);
      console.log(`/quit ${argsObject.arg}`);
      break;
    // USERS [CHANNEL ID]
    case "/users":
      socket.emit("get_channel_users", argsObject.channelId);
      console.log(`/users ${argsObject.channelId}`);
      break;
    // MSG [USERNAME] [MESSAGE]
    case "/msg":
      socket.emit("create_private", argsObject);
      console.log(`/msg ${argsObject.username} ${argsObject.content}`);
      break;
    default:
      console.error("ALERTE ROUGE PK ON EST DANS LE DEFAULT !!!!!");
      break;
  }
}
