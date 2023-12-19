import socket from "../socketSetup";

const UserShotHandler = (
  players,
  playerShot,
  setPlayerShot,
  userId,
  playersRoom,
  numOfPlayers
) => {
  const parsedNumOfPlayers = parseInt(numOfPlayers);

  if (Object.keys(players).length > 0) {
    if (Object.keys(players).length === parsedNumOfPlayers) {
      const dataMotion = {
        number: playerShot,
        user: userId.userId,
        room: playersRoom,
      };
      socket.emit("motion", dataMotion);

      const dataNextTurn = {
        next: true,
        room: playersRoom,
      };

      if (playerShot.length > 0) {
        socket.emit("nextTurn", dataNextTurn);
      }

      setPlayerShot("");
    }
  }
};

export default UserShotHandler;
