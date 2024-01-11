import { usePlayer } from "../hooks/PlayerContext";
import { UserShotHandler } from "../services";
import socket from "../socketSetup";
import s from "./GameSettings.module.css";

const SendShot = () => {
  const {
    gameOver,
    errorShot,
    players,
    turn,
    playerShot,
    setPlayerShot,
    userId,
    playersRoom,
    numOfPlayers,
  } = usePlayer();

  return (
    <div className={s.containerbutton}>
      {!gameOver && Object.keys(errorShot).length < 1 && (
        <button
          disabled={players[socket?.id]?.user !== turn?.user ? true : false}
          onClick={() =>
            UserShotHandler(
              players,
              playerShot,
              setPlayerShot,
              userId,
              playersRoom,
              numOfPlayers
            )
          }
        >
          Enviar tiro
        </button>
      )}
    </div>
  );
};

export default SendShot;
