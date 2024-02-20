import { isCommand, parseCommand } from "./chatInputHandler";

/**
 * Check if the provided command is valid and can be executed without a specific channel.
 *
 * @param {string} command - The command to be validated
 * @return {boolean} Whether the command is valid and can be executed without a specific channel
 *
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export default function isValidCommand(command) {
  console.log("Checking if command is valid: ", command);
  if (!isCommand(command)) {
    return false;
  }

  const commande = parseCommand(command);

  const commandsUsableWithoutChannel = [
    "/list",
    "/join",
    "/create",
    "/delete",
    "/quit",
  ];

  if (!commandsUsableWithoutChannel.includes(commande)) {
    return false;
  }

  return true;
}
