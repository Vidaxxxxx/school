import React from 'react';
import { useSocket } from "../SocketIO/socket";
import { VStack, Avatar, Tooltip, Button } from "@chakra-ui/react";
import { useAuth } from '../Authentication/AuthProvider';
import { useChannel } from '../Channels/ChannelProvider';

/**
 * Component for navigating channels.
 *
 * @param {Object} channelsListState - state object containing channel list and setter function
 * @return {JSX.Element} JSX element representing the channel navigation component
 * 
 * @author [David LAUNE](https://github.com/Vidaxxxxx)
 */
export default function ChannelNavigation() {

  const socket = useSocket();


  const { channelsList, setChannelsList, activeChannel, updateActiveChannel, } = useChannel();
  const { getToken } = useAuth();
  const token = getToken();
  const userID = token.data._id;

  const appendChannelToChannelListState = (newChannel) => {
    setChannelsList((prevChannels) => [...prevChannels, newChannel]);
  }

  const removeChannelFromChannelListState = (channelId) => {
    setChannelsList((prevChannels) => prevChannels.filter((channel) => channel._id !== channelId));
  }

  React.useEffect(() => {
    socket.emit('get_user_channels');

    socket.on('user_channels_list', (userChannelsList) => {
      setChannelsList(userChannelsList);
    });

    socket.on("channel_deleted", (channel) => {
      removeChannelFromChannelListState(channel._id);
    });
    socket.on('channel_left', (channel) => {
      removeChannelFromChannelListState(channel._id);
    });


    socket.once('channel_joined', (channel) => {
      socket.emit('get_user_channels');
      console.log(`New Channel joined: ${channel.title}`);
    });

    // Clean after quitting allow to stop listening events to avoid memory leaks
    return () => {
      socket.off('all_channels_list');
      socket.off('new_channel_created');
      socket.off('channel_deleted');
      socket.off("channel_left");
      socket.off("channel_joined");
    };

  }, [appendChannelToChannelListState, removeChannelFromChannelListState]);


  /**
   * Event handler for clicks on channel icon.
   * Changes the active channel in the channelList 
   *
   * @param {object} clickedChannel - The clicked channel object 
   * @author [David LAUN](https://github.com/Vidaxxxxx)
   */
  const setActiveChannel = (clickedChannel) => { // if call, join channel function from server
    console.log(`Active channel is: ${clickedChannel._id}`);

    const updatedChannelsList = updateActiveChannel(clickedChannel);
    setChannelsList(updatedChannelsList);
  };

  return (
    <VStack w="100%" h="100%" spacing={4} alignItems="center">
      <VStack spacing="10px" align="stretch" width="full" padding="10px">
        {/* Add an avatar with a + like in discord that displays a modal for channel search */}
        {channelsList.map((channel) => (
          <Tooltip hasArrow label={channel.title} key={channel._id}>
            <Avatar
              name={channel.title}
              src={channel.avatarUrl}
              size="md"
              onClick={() => updateActiveChannel(channel)}
              cursor="pointer"
              alignSelf="center"
              bg="gray.500"
              border={(channel._id === activeChannel._id) ? '3px solid #00B5D8' : '0px'}
            />
          </Tooltip>
        ))}
      </VStack>
    </VStack>
  );
}