import { useEffect } from "react";
import socket from "../socketSetup";

const TotalOnlineUsers = (connectedUsers, playersRoom) => {
  const onlineUsersData = {
    connectedUsers,
    room: playersRoom,
  };
  useEffect(() => {
    socket.emit("totalOnlineUsersNn", onlineUsersData);
  }, [connectedUsers]);
};

export default TotalOnlineUsers;
