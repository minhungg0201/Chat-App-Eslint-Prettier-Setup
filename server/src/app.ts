import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import config from "config";
import logger from "./utils/logger";
import socket from "./socket";

const app = express();
const port = config.get<number>("port");
const corsOrigin = config.get<string>("corsOrigin");
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin,
    credentials: true,
  },
});

app.get("/", (_, res) => {
  res.send("Hello, world!");
});

httpServer.listen(port, () => {
  logger.info({ msg: "🚀 Server listening at port 8080 🚀" });
  console.log("Hello");
  socket({ io });
});
