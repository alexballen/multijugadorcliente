import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3002");

const useSocket = (eventName, callback) => {
  useEffect(() => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [eventName, callback]);
};

export default useSocket;
