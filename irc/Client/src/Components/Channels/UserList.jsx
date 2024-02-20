import React, { useState, useEffect } from 'react';
import { useSocket } from "../SocketIO/socket";
import { useChannel } from './ChannelProvider';
import { Heading, Avatar, VStack, HStack, Input, InputGroup, InputLeftElement, Button } from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@chakra-ui/color-mode";
import UserSearchModal from './UserSearchModal';

const UserList = () => {
    const socket = useSocket();

    const { activeChannel, updateActiveChannel, privateChannelsList, setPrivateChannelsList } = useChannel();
    const [displayedChannels, setDisplayedChannels] = useState([]);

    const bgColor = useColorModeValue("gray.300", "gray.800");

    useEffect(() => {


        socket.emit("get_user_private_channels");

        socket.on("private_channels_list", (channels) => {
            setPrivateChannelsList(channels);
            setDisplayedChannels(channels);
        })

        socket.on("new_private_channel", (channel) => {
            setPrivateChannelsList([...privateChannelsList, channel]);
            updateActiveChannel(channel);
        });

        return () => {
            socket.off('users_list');
            socket.off('new_private_channel');
        };
    }, [socket, activeChannel,]);

    const filterUsers = (e) => {
        (e.target.value === "")
            ? setDisplayedChannels(privateChannelsList)
            : setDisplayedChannels(privateChannelsList.filter(channel => channel.title.toLowerCase().includes(e.target.value.toLowerCase())));
    }

    return (
        <VStack paddingX={"10px"} paddingY={"20px"}>
            <form>
                <InputGroup >
                    <InputLeftElement pointerEvents={'none'} h={'full'}>
                        <SearchIcon color={'whiteAlpha.300'} />
                    </InputLeftElement>
                    <Input placeholder="Search chat" bg={"blackAlpha.600"} size={"sm"} borderRadius={"md"} onChange={filterUsers} />
                </InputGroup>
            </form>
            <UserSearchModal />
            <div>
                {displayedChannels.map(channel => (
                    <HStack key={channel._id} marginY={"5px"} bg={bgColor} onClick={() => updateActiveChannel(channel)}>

                        <Avatar size="xs" name='Segun Adebayo' src={`https://source.boringavatars.com/marble/120/${channel._id}?colors=031C30,5A3546,B5485F,FC6747,FA8D3B`} alignSelf={"flex-start"} marginTop={"5px"} />
                        <p>{channel.title}</p>
                    </HStack>
                ))}
            </div>

        </VStack>
    );
};

export default UserList;
