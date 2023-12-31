import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const ShotE = () => {
  const { playerShot, setPlayerShot } = usePlayer();

  useEffect(() => {
    socket.on("shotNn", (shot) => {
      setPlayerShot(shot);
    });
  }, []);

  return playerShot;
};

export default ShotE;
