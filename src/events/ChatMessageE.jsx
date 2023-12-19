import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const ChatMessageE = () => {
  const { storedUserChatMessage, setStoredUserChatMessage } = usePlayer();

  useEffect(() => {
    socket.on("chatMessage", (chatMessage) => {
      setStoredUserChatMessage(chatMessage);
    });
  }, []);

  return storedUserChatMessage;
};

export default ChatMessageE;
