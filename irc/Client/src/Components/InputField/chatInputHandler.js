import sendAppropriateCommand from "./sendAppropriateCommand";

/**
 * Checks if the message is a command.
 *
 * @param {string} message - The message to be checked.
 * @return {boolean} Whether the message is a command or not.
 *
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export function isCommand(message) {
  const commandsList = [
    "/nick",
    "/list",
    "/create",
    "/delete",
    "/join",
    "/quit",
    "/users",
    "/msg",
  ];

  const firstWord = message.trim().split(" ")[0];

  return firstWord.startsWith("/") && commandsList.includes(firstWord);
}

export function parseCommand(message) {
  return message.trim().split(" ")[0];
}

/**
 * Sends a message to a specified channel using its ID
 *
 * @param {Object} socket - the socket object for communication
 * @param {string} channelId - the ID of the channel to send the message to
 * @param {string} message - the message to be sent to the channel
 */
function sendMessage(socket, channelId, message) {
  console.log(`Message "${message}" envoyé dans le canal ${channelId}`);
  socket.emit("create_message", { message, channelId });
}

/**
 * Determines the number of arguments required for a given command.
 *
 * @param {string} command - the command for which to determine the number of arguments
 * @return {number} the number of arguments required for the given command
 */
function determineNumberOfArgs(command) {
  const noArg = ["/users"];
  const variableArg = ["/list"];
  const oneArg = ["/nick", "/create", "/delete", "/join", "/quit"];
  const twoArgs = ["/msg"];

  if (noArg.includes(command)) {
    return 0;
  } else if (variableArg.includes(command)) {
    return -1;
  } else if (oneArg.includes(command)) {
    return 1;
  } else if (twoArgs.includes(command)) {
    return 2;
  }
}

/**
 * Parses the arguments in the message based on the number of arguments provided.
 *

 * @param {string} message - the message to parse
 * @param {number} numberOfArgs - the number of arguments to parse
 * @param {string} channelId - the ID of the channel to send the message to
 * 
 * @return {Object} the parsed arguments based on the number of arguments
 */
function parseArgs(message, numberOfArgs, channelId) {
  const messageParts = message.trim().split(" ");

  if (numberOfArgs === -1) {
    // /list [keyword]
    if (messageParts.length > 1) {
      return { channelId, keyword: messageParts[1] };
    }
    // /list
    return { channelId };
  } else if (numberOfArgs === 0) {
    // /users
    if (!channelId) {
      console.error(`You have to select a channel first !`);
      return;
    }
    return { channelId };
  } else if (numberOfArgs === 1 && messageParts.length > 1) {
    return { arg: messageParts[1] };
  } else if (numberOfArgs === 2 && messageParts.length > 2) {
    const username = messageParts[1];
    const content = messageParts.slice(2).join(" ");
    return { username, content };
  } else {
    console.error(`Invalid number of arguments for command ${messageParts[0]}`);
  }
}

/**
 * Handles the input from the chat, resetting the form and
 * sends whether a command or a message to the server.
 *
 * @param {Object} values - the input values from the chat
 * @param {Object} io - the socket.io instance
 * @param {Object} activeChannel - the active chat channel
 */
export default function chatInputHandler(values, io, activeChannel) {
  const { message } = values;
  const socket = io;
  const channelId = activeChannel._id;

  // Si l'input est un message
  if (!isCommand(message)) {
    sendMessage(socket, channelId, message);
    return;
  }

  // Sinon l'input est une commande
  console.log("Commande détectée !");
  const command = parseCommand(message);

  const numberOfArgs = determineNumberOfArgs(command);
  const args = parseArgs(message, numberOfArgs, channelId);

  sendAppropriateCommand(socket, command, args);
}
