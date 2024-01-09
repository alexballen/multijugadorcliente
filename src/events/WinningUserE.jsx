import { useEffect, useRef } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const WinningUserE = (playersRoom) => {
  const { randomNumber, setRandomNumber, winningUsers, setWinningUsers } =
    usePlayer();

  const roomRef = useRef();

  useEffect(() => {
    roomRef.current = playersRoom;
  }, [playersRoom]);

  useEffect(() => {
    socket.on("winningUserNn", (winnerData) => {
      // Comprobar si hay un número aleatorio en los datos del servidor
      const randomNumberInData = winnerData.find(
        (number) => number.randomNumber
      );

      if (randomNumberInData) {
        // Actualizar el estado del número aleatorio
        setRandomNumber(randomNumberInData.randomNumber);
      }

      // Filtrar y procesar los datos de usuarios ganadores
      const usersWinners = winnerData.filter((userWinner) => userWinner.user);
      if (usersWinners.length > 0) {
        setWinningUsers(usersWinners);
      }

      //Ejecutar el evento del siguiente turno
      const dataNextTurn = {
        next: true,
        room: roomRef.current,
      };

      socket.emit("nextTurnNn", dataNextTurn);
    });
  }, []);

  return {
    randomNumber,
    winningUsers,
  };
};

export default WinningUserE;
