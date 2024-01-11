import { usePlayer } from "../hooks/PlayerContext";
import { HandlerRoomName } from "../services";
import s from "./GameSettings.module.css";

const Room = () => {
  const { playersRoom, connectionMessages, setPlayersRoom, errorRoom } =
    usePlayer();

  return (
    <div className={s.margindivs}>
      <h3>Sala</h3>
      <input
        value={playersRoom}
        readOnly={connectionMessages?.connected === true ? true : false}
        type="text"
        placeholder="Ingresa sala de juego"
        onChange={(event) => HandlerRoomName(event, setPlayersRoom)}
      />
      {errorRoom.room && (
        <h4>
          <small>{errorRoom.room}</small>
        </h4>
      )}
    </div>
  );
};

export default Room;
