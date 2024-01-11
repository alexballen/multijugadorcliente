import { useEffect } from "react";

const SetErrorPlayers = (setErrorPlayers, playersValidator, numOfPlayers) => {
  useEffect(() => {
    setErrorPlayers(playersValidator(numOfPlayers));
  }, [numOfPlayers, setErrorPlayers, playersValidator]);
};

export default SetErrorPlayers;
