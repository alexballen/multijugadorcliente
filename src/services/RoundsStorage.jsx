import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";

const RoundsStorage = (storedRounds) => {
  const { roundsStorage, setRoundsStorage } = usePlayer();

  useEffect(() => {
    const storedRoundsFromLocalStorage = JSON.parse(
      localStorage.getItem("rounds")
    );
    if (storedRoundsFromLocalStorage) {
      setRoundsStorage(storedRoundsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (storedRounds.length > 0) {
      const numbers = storedRounds.map((round) => round.number);

      setRoundsStorage((prevUniqueRoundIds) => [
        ...prevUniqueRoundIds,
        numbers,
      ]);
    }
  }, [storedRounds]);

  useEffect(() => {
    if (roundsStorage.length > 0) {
      localStorage.setItem("rounds", JSON.stringify(roundsStorage));
    }
  }, [roundsStorage]);

  return roundsStorage;
};

export default RoundsStorage;
