import React from "react";
import io from "socket.io-client";

const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";
export const socket = io(backendUrl);

export const SocketContext = React.createContext(socket);
export const useSocket = () => React.useContext(SocketContext);
