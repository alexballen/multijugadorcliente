import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const RoundsE = () => {
  const { rounds, setRounds } = usePlayer();

  useEffect(() => {
    socket.on("roundsNn", (roundsNew) => {
      setRounds(roundsNew);
    });
  }, [rounds]);

  return rounds;
};

export default RoundsE;
