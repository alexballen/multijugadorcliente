import socket from "../socketSetup";

const HandlerNewUser = (idUser, room, numOfPlayers, rounds) => {
  const idUserAndRoom = {
    idUser,
    room,
    numOfPlayers,
    rounds,
  };

  socket.emit("newUser", idUserAndRoom);
};

export default HandlerNewUser;
