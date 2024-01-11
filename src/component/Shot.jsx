import { usePlayer } from "../hooks/PlayerContext";
import { HandlerPlayerShot } from "../services";
import socket from "../socketSetup";
import s from "./GameSettings.module.css";

const Shot = () => {
  const { gameOver, players, turn, playerShot, errorShot, setPlayerShot } =
    usePlayer();

  return (
    <div className={s.containershot}>
      <h3>Tiro</h3>
      {!gameOver && (
        <input
          type="number"
          readOnly={players[socket?.id]?.user !== turn.user ? true : false}
          placeholder="Elige un número del 1 al 100"
          value={playerShot}
          onChange={(event) => HandlerPlayerShot(event, setPlayerShot)}
        />
      )}
      {!gameOver && errorShot.shot && (
        <h4>
          <small>{errorShot.shot}</small>
        </h4>
      )}
    </div>
  );
};

export default Shot;
