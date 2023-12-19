import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const UserId = () => {
  const { userId, setUserId } = usePlayer();

  useEffect(() => {
    socket.on("userId", (userNew) => {
      setUserId(userNew);
    });

    return () => {
      socket.off("userId");
    };
  }, []);

  return userId;
};

export default UserId;
