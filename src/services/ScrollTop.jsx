import { useEffect } from "react";

const ScrollTop = (messagesContainerRef, storedUserChatMessage) => {
  useEffect(() => {
    if (messagesContainerRef.current && storedUserChatMessage.length > 0) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [storedUserChatMessage, messagesContainerRef]);
};

export default ScrollTop;
