import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const UserId = () => {
  const { userId, setUserId } = usePlayer();

  useEffect(() => {
    socket.on("userIdNn", (userNew) => {
      setUserId(userNew);
    });

    return () => {
      socket.off("userIdNn");
    };
  }, []);

  return userId;
};

export default UserId;
