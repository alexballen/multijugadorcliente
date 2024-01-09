import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const RoomE = () => {
  const { playersRoom, setPlayersRoom } = usePlayer();

  useEffect(() => {
    socket.on("roomNn", (room) => {
      setPlayersRoom(room);
    });
  }, []);

  return playersRoom;
};

export default RoomE;
