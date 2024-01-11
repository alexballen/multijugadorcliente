import { useEffect } from "react";

const SetGameOver = (
  connectionMessages,
  rounds,
  roundsStorage,
  setGameOver
) => {
  useEffect(() => {
    if (connectionMessages?.connected) {
      if (Number(rounds) === roundsStorage.length) {
        setGameOver(true);
      } else {
        setGameOver(false);
      }
    }
  }, [setGameOver, rounds, roundsStorage, connectionMessages?.connected]);
};

export default SetGameOver;
