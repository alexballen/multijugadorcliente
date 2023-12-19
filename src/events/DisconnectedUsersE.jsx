import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const DisconnectedUsersE = () => {
  const { disconnectedUsers, setDisconnectedUsers } = usePlayer();

  useEffect(() => {
    socket.on("disconnectedUsers", (disconnectedUser) => {
      setDisconnectedUsers(disconnectedUser);
    });
  }, []);

  return disconnectedUsers;
};

export default DisconnectedUsersE;
