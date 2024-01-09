import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const UserMovementsE = () => {
  const { storedRounds, setStoredRounds } = usePlayer();

  useEffect(() => {
    socket.on("userMovementsNn", (userMovements) => {
      setStoredRounds(userMovements);
    });
  }, []);

  return storedRounds;
};

export default UserMovementsE;
