import React from "react";
import { useSocket } from "../SocketIO/socket";

const ChannelContext = React.createContext();

/**
 *  Custom hook to access the ChannelContext. 
 * @returns {Object} The ChannelContext object.
 * 
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export const useChannel = () => React.useContext(ChannelContext);

/**
 * ChannelProvider component that provides channel context to its children.
 *
 * @param {Object} children - The child components to be wrapped by the provider.
 * @return {JSX.Element} The wrapped child components.
 * 
 * @author [Gabriel LOPEZ](https://github.com/glopez-dev)
 */
export function ChannelProvider({ children }) {

    const [channelsList, setChannelsList] = React.useState([]);
    const [privateChannelsList, setPrivateChannelsList] = React.useState([]);
    const [activeChannel, setActiveChannel] = React.useState({});
    const socket = useSocket();

    const updateActiveChannel = (newActiveChannel) => {
        socket.emit("change_active_channel", newActiveChannel._id);
        setActiveChannel(newActiveChannel);
        console.log(`The active channel is: ${newActiveChannel.title ? newActiveChannel.title : "none"} with id ${newActiveChannel._id}`);
    }

    const value = {
        channelsList,
        setChannelsList,
        activeChannel,
        updateActiveChannel,
        privateChannelsList,
        setPrivateChannelsList,
    }

    return (
        <ChannelContext.Provider value={value}>
            {children}
        </ChannelContext.Provider>
    )
}

