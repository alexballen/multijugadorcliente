import { useEffect, useRef } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const WeHaveWinnerE = (playersRoom) => {
  const { thereIsAWinner, setThereIsAWinner } = usePlayer();

  const roomRef = useRef();

  useEffect(() => {
    roomRef.current = playersRoom;
  }, [playersRoom]);

  useEffect(() => {
    socket.on("weHaveWinner", (weHaveWinner) => {
      const dataWeHaveWinner = {
        winnerOk: true,
        room: roomRef.current,
      };

      if (weHaveWinner) {
        socket.emit("winnerData", dataWeHaveWinner);
        setThereIsAWinner(weHaveWinner);
      }
    });
  }, []);

  return thereIsAWinner;
};

export default WeHaveWinnerE;
