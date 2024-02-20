export default class MissingArgumentException extends Error {
  constructor(command) {
    super(`Missing argument for command: ${command}`);
    this.name = "MissingArgumentException";
    this.command = command;
  }
}
