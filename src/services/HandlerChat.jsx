import socket from "../socketSetup";
import { GetCurrentTime } from "../services";

const HandlerChat = (
  playersRoom,
  userNameId,
  userChatMessage,
  setUserChatMessage
) => {
  const currentTime = GetCurrentTime();

  if (userChatMessage.length > 0) {
    socket.emit("chatNn", {
      room: playersRoom,
      user: userNameId,
      message: userChatMessage,
      timestamp: currentTime,
    });
    setUserChatMessage("");
  }
};

export default HandlerChat;
