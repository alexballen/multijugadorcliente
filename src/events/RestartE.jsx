import socket from "../socketSetup";

const RestartE = (playersRoom) => {
  socket.emit("buttonRestartTheGameNn", { confirm: true, room: playersRoom });
};

export default RestartE;
