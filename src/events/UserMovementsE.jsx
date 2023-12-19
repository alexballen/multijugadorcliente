import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const UserMovementsE = () => {
  const { storedRounds, setStoredRounds } = usePlayer();

  useEffect(() => {
    socket.on("userMovements", (userMovements) => {
      setStoredRounds(userMovements);
    });
  }, []);

  return storedRounds;
};

export default UserMovementsE;
