import socket from "../socketSetup";

const HandlerChat = (
  playersRoom,
  userNameId,
  userChatMessage,
  setUserChatMessage,
  chatTimestamp
) => {
  if (userChatMessage.length > 0) {
    socket.emit("chatNn", {
      room: playersRoom,
      user: userNameId,
      message: userChatMessage,
      timestamp: chatTimestamp,
    });
    setUserChatMessage("");
  }
};

export default HandlerChat;
