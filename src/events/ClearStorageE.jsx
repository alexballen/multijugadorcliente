import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const ClearStorageE = () => {
  const {
    roundsStorage,
    setRoundsStorage,
    storedWinningNumber,
    setStoredWinningNumber,
  } = usePlayer();

  useEffect(() => {
    socket.on("clearLocalStorageNn", (clear) => {
      if (clear) {
        localStorage.removeItem("roundsNn");
        localStorage.removeItem("storingWinningNumbersNn");
        setRoundsStorage([]);
        setStoredWinningNumber([]);
      }
    });
  }, []);

  return {
    roundsStorage,
    storedWinningNumber,
  };
};

export default ClearStorageE;
