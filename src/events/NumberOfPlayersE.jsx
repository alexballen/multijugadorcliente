import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const NumberOfPlayersE = () => {
  const { numOfPlayers, setNumOfPlayers } = usePlayer();

  useEffect(() => {
    socket.on("numberOfPlayersNn", (numberPlayersNew) => {
      const stringNum = String(numberPlayersNew);
      setNumOfPlayers(stringNum);
    });
  }, [numOfPlayers]);

  return numOfPlayers;
};

export default NumberOfPlayersE;
