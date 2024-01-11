import { useEffect } from "react";
import { usePlayer } from "../hooks/PlayerContext";

const StoringWinningNumbers = (storedRounds, winningUsers) => {
  const { storedWinningNumber, setStoredWinningNumber } = usePlayer();

  useEffect(() => {
    const storedWinner = JSON.parse(
      localStorage.getItem("storingWinningNumbersNn")
    );
    if (storedWinner) {
      setStoredWinningNumber(storedWinner);
    }
  }, []);

  useEffect(() => {
    if (storedRounds.length > 0 && winningUsers[0]?.number) {
      setStoredWinningNumber((prevRandom) => [
        ...prevRandom,
        winningUsers[0]?.number,
      ]);
    }
  }, [storedRounds]);

  useEffect(() => {
    if (storedWinningNumber.length > 0) {
      localStorage.setItem(
        "storingWinningNumbersNn",
        JSON.stringify(storedWinningNumber)
      );
    }
  }, [storedWinningNumber]);

  return storedWinningNumber;
};

export default StoringWinningNumbers;
