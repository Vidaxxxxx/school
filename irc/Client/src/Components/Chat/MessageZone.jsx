import { VStack } from "@chakra-ui/react";
import React from "react";
import { useSocket } from "../SocketIO/socket";
import { useChannel } from "../Channels/ChannelProvider";
import MessageBox from "./MessageBox";

export default function MessageZone() {

  const socket = useSocket();
  const [messageList, setMessageList] = React.useState([]);
  const { activeChannel } = useChannel();

  React.useEffect(() => {

    if (Object.keys(activeChannel).length !== 0) {
      socket.emit('get_channel_messages', activeChannel._id);
      console.log(`Requesting the server to get the messages from the channel ${activeChannel._id}`);
    }

    socket.on("channel_messages_list", (messages) => {
      setMessageList(messages);
    });

    socket.on("new_message", (newMessage) => {
      console.log("Le serveur indique qu'un nouveau message à été ajouté au channel :", newMessage);
      if (newMessage.channel === activeChannel._id) {
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    socket.on("channel_deleted", (channel) => {
      setMessageList([]);
    });

    socket.on('channel_left', (channel) => {
      setMessageList([]);
    });

    return () => {
      socket.off("channel_messages_list");
      socket.off("new_message");
      socket.off("channel_deleted");
      socket.off('channel_left');
    }

  }, [activeChannel, setMessageList]);


  return (
    <VStack w="100%" h="fit-content" paddingRight={"10px"}>

      <ol style={{ listStyleType: "none", width: "100%", paddingLeft: "10px", }}>

        {messageList.map((message) => (
          <MessageBox key={message._id} message={message} />
        ))}
      </ol>
    </VStack>
  );
}