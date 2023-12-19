import socket from "../socketSetup";

const HandlerChat = (
  playersRoom,
  userNameId,
  userChatMessage,
  setUserChatMessage
) => {
  if (userChatMessage.length > 0) {
    socket.emit("chat", {
      room: playersRoom,
      user: userNameId,
      message: userChatMessage,
    });
    setUserChatMessage("");
  }
};

export default HandlerChat;
