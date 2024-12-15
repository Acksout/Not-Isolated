import express from "express";
import http from "http";
import { Server } from "socket.io";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);

  const io = new Server(httpServer, {
    path: "/api/socket-io",
    transports: ["websocket", "polling"],
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
      credentials: false,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("message", (data) => {
      console.log("Message from client:", data);
      socket.emit("response", "Message received!");
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(3001, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3001");
  });
});
