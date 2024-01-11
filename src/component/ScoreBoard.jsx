import { usePlayer } from "../hooks/PlayerContext";
import s from "./GameSettings.module.css";

const ScoreBoard = () => {
  const { playersQueue, roundsStorage, storedWinningNumber } = usePlayer();

  return (
    <div className={s.containertable}>
      <h3>Puntuación</h3>
      <table>
        <thead>
          <tr className={s.trtitle}>
            <th>{playersQueue?.length ? "Tiros" : ""}</th>
            {playersQueue.map((playUs, index) => (
              <th key={index}>{playUs}</th>
            ))}
            <th>{playersQueue?.length ? "Aleatorio" : ""}</th>
          </tr>
        </thead>
        <tbody className={s.containeritems}>
          {roundsStorage &&
            roundsStorage.map((row, rowIndex) => (
              <tr className={s.tritem} key={rowIndex}>
                <td className={s.randomnumber}>{rowIndex + 1}</td>
                {row.slice(0, -1).map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={
                      cell === String(storedWinningNumber[rowIndex])
                        ? s.truecolor
                        : s.falsecolor
                    }
                  >
                    {cell}
                  </td>
                ))}

                <td className={s.randomnumber}>{row[row.length - 1]}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
