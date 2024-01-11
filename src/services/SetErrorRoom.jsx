import { useEffect } from "react";

const SetErrorRoom = (setErrorRoom, roomValidator, playersRoom) => {
  useEffect(() => {
    setErrorRoom(roomValidator(playersRoom));
  }, [playersRoom, setErrorRoom, roomValidator]);
};

export default SetErrorRoom;
