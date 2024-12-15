import { Server } from "socket.io";

let io;

export const POST = async (req, res) => {
  if (!io) {
    const httpServer = res.socket.server;
    io = new Server(httpServer, {
      path: "/api/socket-io",
    });

    io.on("connection", (socket) => {
      console.log("a user connected");
      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
  res.status(200).json({ message: "Socket.IO initialized" });
};
