import { Avatar, AvatarBadge } from "@chakra-ui/react";
import { useChannel } from "../Channels/ChannelProvider";
import { useSocket } from "../SocketIO/socket";
import React from "react";

export default function ChannelBadge({ channel }) {

    const { activeChannel, updateActiveChannel } = useChannel();
    const [notifications, setNotifications] = React.useState(1);
    const socket = useSocket();

    React.useEffect(() => {
        const handleNewMessage = (newMessage) => {
            console.log("Notification sur le channel: ", newMessage.channel);
            if (newMessage.channel === channel._id) {
                setNotifications(prevNotifications => prevNotifications + 1);
            }
        };

        socket.on("new_message", handleNewMessage);

        return () => {
            socket.off("new_message", handleNewMessage);
        };
    }, [channel._id, socket]);

    const onClick = () => {
        updateActiveChannel(channel);
        setNotifications(0);
    }

    return (
        <>
            <Avatar
                key={channel._id}
                name={channel.title}
                src={channel.avatarUrl}
                size="md"
                onClick={onClick}
                cursor="pointer"
                alignSelf="center"
                bg="gray.500"
                border={(channel._id === activeChannel._id) ? '3px solid green' : '0px'}
            />
            {notifications && (<AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' />)
            }
        </>
    );
}
