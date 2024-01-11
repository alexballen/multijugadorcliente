import { useEffect } from "react";

const SetErrorShot = (setErrorShot, shotValidator, playerShot) => {
  useEffect(() => {
    setErrorShot(shotValidator(playerShot));
  }, [playerShot, setErrorShot, shotValidator]);
};

export default SetErrorShot;
