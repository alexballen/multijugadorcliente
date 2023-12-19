import socket from "../socketSetup";

const RestartE = (playersRoom) => {
  socket.emit("buttonRestartTheGame", { confirm: true, room: playersRoom });
};

export default RestartE;
