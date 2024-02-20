import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Style from '../Style/channel.module.css';

const socket = io('http://localhost:4000');

function App() {
    const [channels, setChannels] = useState([]);


    useEffect(() => {

        socket.on('channels', (data) => {
            setChannels(data);
        });

        socket.on('new_channel', (newChannel) => {
            setChannels((prevChannels) => [...prevChannels, newChannel]);
        });

        socket.on('delete_channelIo', (channelId) => {
            setChannels((prevChannels) => prevChannels.filter((channel) => channel._id !== channelId));
        })




        socket.emit('get_all_channel');

        return () => {
            socket.off('channels');
            socket.off('new_channel');

        };
    }, []);


    const joinChannel = (channelId) => {
        socket.emit('join_channel', channelId);
    }

    const deleteChannel = (channelId) => {
        socket.emit('delete_channel', channelId);
        console.log(channelId);
    };



    return (
        <div>
            <ul>
                {channels.map((channel) => (
                    <div className={Style.channel} key={channel._id}>
                        <div className={Style.title}>{channel.title}</div>
                        <div className={Style.btn}>
                            <button onClick={() => joinChannel(channel._id)}>Join</button>
                            <button onClick={() => deleteChannel(channel._id)}>Supprimer</button>
                        </div>
                    </div>
                ))}
            </ul>

        </div>
    );
}

export default App;
