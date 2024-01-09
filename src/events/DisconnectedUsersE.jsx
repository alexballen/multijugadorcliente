import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const DisconnectedUsersE = () => {
  const { disconnectedUsers, setDisconnectedUsers } = usePlayer();

  useEffect(() => {
    socket.on("disconnectedUsersNn", (disconnectedUser) => {
      setDisconnectedUsers(disconnectedUser);
    });
  }, [setDisconnectedUsers]);

  return disconnectedUsers;
};

export default DisconnectedUsersE;
