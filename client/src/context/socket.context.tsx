import { useContext, createContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../config/default";
import EVENTS from "../config/events";

const socket = io(SOCKET_URL);

interface Context {
  username: string;
  userId: string;
  roomName: string;
  roomId?: string;
  setUsername: Function;
  setRoomName: Function;
  setMessages: Function;
  message?: string;
  messages?: {
    message: string;
    username: string;
    time: string;
  }[];
  rooms?: { name: string; roomId: string }[];
  socket: Socket;
}

const SocketContext = createContext<Context>({
  username: "",
  userId: "",
  roomName: "",
  setRoomName: () => false,
  setUsername: () => false,
  setMessages: () => false,
  messages: [],
  rooms: [],
  socket,
});

const SocketProvider = (props: any) => {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState([]);

  const infoChat = {
    socket,
    username,
    roomName,
    messages,
    roomId,
    rooms,
    setRoomName,
    setMessages,
    setUsername,
    setRoomId,
    setRooms,
  };
  useEffect(() => {
    window.onfocus = function () {
      document.title = "Chat app";
    };
  }, []);

  socket.on(EVENTS.SERVER.ROOMS, (value = {}) => {
    setRooms(value);
  });

  socket.on(EVENTS.SERVER.JOINED_ROOM, (value = "") => {
    setRoomId(value);
    setMessages([]);
  });

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({ message, username, time }) => {
      if (!document.hasFocus()) {
        document.title = "New message...";
      }
      // setMessages((messages) => [...messages, { message, username, time }]);
    });
  }, []);

  return <SocketContext.Provider value={infoChat} {...props} />;
};

export const useSockets = () => useContext(SocketContext);

export default SocketProvider;
