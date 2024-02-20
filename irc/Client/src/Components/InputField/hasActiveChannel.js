export default function hasActiveChannel(channelsList) {
  for (const channel of channelsList) {
    if (channel.active) {
      return true;
    }
  }
  return false;
}
