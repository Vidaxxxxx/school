import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Style from '../Style/input.module.css';

const socket = io('http://localhost:4000');

const ChatComponent = () => {

  const [message, setMessage] = useState("");
  // const [messageR, setMessageR] = useState('');
  const [channel, setChannel] = useState('');
  const [joinChannel, setJoinChannel] = useState('');




  const createChannel = () => {
    if (channel !== "") {
      socket.emit("create_channel", channel);
    }
  }

  socket.on('join_channelIo', (channelId) => {
    console.log(`Vous avez rejoint le canal ${channelId}`);
    setJoinChannel(channelId);

  });



  const sendMessage = () => {
    if (message !== "" && joinChannel !== "") {
      socket.emit("create_message", { message, joinChannel });
      console.log("Message envoyé");
    }
  };




  // useEffect(() => {
  //   // socket.on("receive_message", (data) => {
  //   //   setMessageR(data.message);
  //   // });

  //   // Nettoye l'écouteur d'événement lors du démontage du composant
  //   return () => {
  //     socket.off("receive_message");
  //   };
  // }, []);

  return (
    <div className={Style.ctn}>

      <div className={Style.message}>
        {/* {messageR} */}
      </div>

      <div className={Style.input}>



        <div className={Style.room}>

          <input
            placeholder="channel..."
            value={channel}
            onChange={(event) => {
              setChannel(event.target.value);
            }}
          />
          <button onClick={createChannel}> Create room</button>

        </div>
        <div className={Style.messages}>

          <input
            placeholder="Message..."
            value={message}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Envoie de message</button> *
        </div>
      </div>


    </div>
  );
}

export default ChatComponent;
