import { nanoid } from "nanoid";
import { Server, Socket } from "socket.io";
import logger from "./utils/logger";
import EVENTS from "../config/events";

interface socketI {
  io: Server;
}

const rooms: Record<string, { name: string }> = {};

const socket = ({ io }: socketI) => {
  logger.info("🔥 Socket enable! 🔥");
  io.on(EVENTS.CONNECTION, (socket: Socket) => {
    logger.info(`✨ User connected ${socket.id} ✨`);
    socket.emit(EVENTS.SERVER.ROOM_MESSAGE, {
      message: "hello",
      username: "Hung",
      time: "3h",
    });
  });
};

export default socket;
