const { createServer } = require("http");
const app = require("./app");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const createMongooseConnection = require("./database");
const Message = require("./models/Message");
const httpServer = createServer(app);

const serverPort = process.env.PORT || 4000;
const clientPort = process.env.CLIENT_PORT || 3000;

httpServer.on("error", (error) => {
  console.error("Erreur du serveur HTTP :", error.message);
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
  maxHttpBufferSize: 1e8,
  pingTimeout: 60000,
});

// Mounts the socket.io middleware
const authenticationHandlers = require("./Socket.io/authenticationHandlers");
const channelsHandlers = require("./Socket.io/channelsHandlers");
const messageHandlers = require("./Socket.io/messagesHandlers");
const userHandlers = require("./Socket.io/usersHandlers");
const nicknameHandlers = require("./Socket.io/nicknameHandlers");

function onConnection(socket) {
  authenticationHandlers(io, socket);
  channelsHandlers(io, socket);
  messageHandlers(io, socket);
  userHandlers(io, socket);
  nicknameHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log(`Utilisateur déconnecté: ${socket.id}`);
  });
}

io.on("connection", onConnection);

// Setups the Mongoose connection
createMongooseConnection();

mongoose.connection.once("open", () => {
  console.log("Successfully connected to MongoDB.");

  httpServer.listen(serverPort, () => {
    console.log(`Server listening on port ${serverPort}`);
  });
});

module.exports = io;
