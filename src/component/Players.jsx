import { usePlayer } from "../hooks/PlayerContext";
import { HandlerNumberOfPlayers } from "../services";
import s from "./GameSettings.module.css";

const Players = () => {
  const { numOfPlayers, connectionMessages, errorPlayers, setNumOfPlayers } =
    usePlayer();

  return (
    <div className={s.margindivs}>
      <h3>Jugadores</h3>
      <input
        value={numOfPlayers}
        readOnly={connectionMessages?.connected === true ? true : false}
        type="number"
        placeholder="Ingrese el número de jugadores por juego"
        onChange={(event) => HandlerNumberOfPlayers(event, setNumOfPlayers)}
      />
      {errorPlayers.players && (
        <h4>
          <small>{errorPlayers.players}</small>
        </h4>
      )}
    </div>
  );
};

export default Players;
