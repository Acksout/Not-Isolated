"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const ConnectSocketIo = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const socketInstance = io("http://localhost:3001", {
      path: "/api/socket-io",
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("connected to server");
    });

    socketInstance.on("message", (data) => {
      setMessage(data);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", "Hello, Server!");
    }
  };

  return (
    <div className="text-white">
      <h1>Socket.IO with Next.js</h1>
      <button onClick={sendMessage}>Send Message</button>
      <p>Message: {message}</p>
    </div>
  );
};

export default ConnectSocketIo;
