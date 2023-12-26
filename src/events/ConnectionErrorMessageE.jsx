import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const ConnectionErrorMessageE = () => {
  const { connectionErrorMessage, setConnectionErrorMessage } = usePlayer();

  useEffect(() => {
    socket.on("connectionErrorMessage", (errorMessage) => {
      setConnectionErrorMessage(errorMessage);
    });
  }, [setConnectionErrorMessage]);

  return connectionErrorMessage;
};

export default ConnectionErrorMessageE;
