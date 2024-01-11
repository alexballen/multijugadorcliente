import { usePlayer } from "../hooks/PlayerContext";
import { HandlerNewUser } from "../services";
import { GoPlay } from "react-icons/go";
import s from "./GameSettings.module.css";

const GoToPlay = () => {
  const {
    errorAlias,
    errorRoom,
    errorPlayers,
    userNameId,
    playersRoom,
    rounds,
    numOfPlayers,
  } = usePlayer();

  return (
    <div className={s.containergoplay}>
      <button
        disabled={
          Object.keys(errorAlias).length < 1 &&
          Object.keys(errorRoom).length < 1 &&
          Object.keys(errorPlayers).length < 1
            ? false
            : true
        }
      >
        <GoPlay
          className={s.goplay}
          onClick={() =>
            HandlerNewUser(userNameId, playersRoom, numOfPlayers, rounds)
          }
        />
        <p>Iniciar</p>
      </button>
    </div>
  );
};

export default GoToPlay;
