import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const ConnectionMessagesE = () => {
  const { connectionMessages, setConnectionMessages } = usePlayer();

  useEffect(() => {
    socket.on("connectionMessagesNn", (connectionMessage) => {
      setConnectionMessages(connectionMessage);
    });
  }, [setConnectionMessages]);

  return connectionMessages;
};

export default ConnectionMessagesE;
