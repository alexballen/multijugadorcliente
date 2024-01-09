import socket from "../socketSetup";

const HandlerNewUser = (userNameId, playersRoom, numOfPlayers, rounds) => {
  const idUserAndRoom = {
    idUser: userNameId,
    room: playersRoom,
    numOfPlayers,
    rounds,
  };

  socket.emit("newUserNn", idUserAndRoom);
};

export default HandlerNewUser;
