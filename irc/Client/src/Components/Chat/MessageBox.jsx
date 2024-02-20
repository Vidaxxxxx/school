import { Box, Card, CardHeader, Avatar, IconButton, Flex, Heading, Text, CardBody, HStack, Spacer } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs"
import { useAuth } from "../Authentication/AuthProvider";
import { useSocket } from "../SocketIO/socket";
import React from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";

export default function MessageBox({ message }) {
  const { getToken } = useAuth();
  const socket = useSocket();
  const channelId = message.channel;

  const [author, setAuthor] = React.useState(message.author);
  const [nickname, setNickname] = React.useState({})
  const [isMessageFromLoggedUser, setIsMessageFromLoggedUser] = React.useState(false)

  const bgColor = useColorModeValue("gray.300", "gray.800");

  React.useEffect(() => {

    socket.emit("get_message_author", message);

    socket.on(`message_${message._id}_author`, (user) => {
      setAuthor(user);
      //console.log(`On message_${message._id}_author`, user);
    });

    const userId = author._id || message.author;
    socket.emit("get_nickname", { channelId, userId: author, messageId: message._id });

    socket.on(`user_nickname_${message._id}`, (nickname) => {
      setNickname(nickname);
    });

    socket.on(`new_nickname_${channelId}`, (nickname) => {
      if (nickname.user === author._id) {
        setNickname(nickname);
      }
    });

    if (author === getToken().data._id) {
      setIsMessageFromLoggedUser(true);
    }

    // Clean socket listener
    return () => {
      socket.off(`message_${message._id}_author`);
      socket.off(`user_nickname_${channelId}`);
      socket.off(`new_nickname_${channelId}`);
    }


  }, [setNickname]);

  const displayName = () => {
    if (nickname && (nickname.user === author._id)) {
      return `${capitalize(nickname.nickname)} (${capitalize(author.username)})`;
    }
    return capitalize(author.username);
  }



  const capitalize = (username) => {
    if (!username) {
      return "Unknown User";
    }
    return username.charAt(0).toUpperCase() + username.slice(1);
  }

  return (
    <HStack marginY="20px" flexDirection={isMessageFromLoggedUser ? "row-reverse" : "row"}>
      <Avatar name={author.username} src={`https://source.boringavatars.com/marble/120/${author._id ? author._id : message._id}?colors=031C30,5A3546,B5485F,FC6747,FA8D3B`} alignSelf={"flex-start"} marginTop={"5px"} />

      <Card width="fit-content" maxWidth="80%" bg={bgColor}>
        <CardHeader padding={"10px"} paddingRight={"5px"} paddingBottom={"0px"}>
          <Flex width="full" spacing='4' >
            <Flex width={"100%"} flex='1' gap='4' alignItems='space-between' flexWrap='wrap' paddingRight="1px">

              <Box width={"max-content"}>
                <Heading size='xs'>{displayName()}</Heading>
                <Text fontSize='xs' color='gray.600'>{new Date(message.timestamp).toLocaleString([], { timeStyle: 'short', dateStyle: 'short' })}</Text>
              </Box>
            </Flex>

            <Spacer width={"60px"} />

            <IconButton
              variant='ghost'
              colorScheme='gray'
              aria-label='See menu'
              icon={<BsThreeDots />}
              h={"30px"}
            />
          </Flex>
        </CardHeader>
        <CardBody paddingX={"10px"} paddingY={"10px"}>
          <Text fontSize={"xs"} maxWidth={"500px"}>
            {message.content}
          </Text>
        </CardBody>
      </Card>

    </HStack >
  )
}
