import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";

const NicknameE = () => {
  const { userNameId, setUserNameId } = usePlayer();

  useEffect(() => {
    socket.on("nicknameNn", (nickname) => {
      setUserNameId(nickname);
    });
  }, []);

  return userNameId;
};

export default NicknameE;
