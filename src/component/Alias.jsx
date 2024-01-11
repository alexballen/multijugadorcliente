import { usePlayer } from "../hooks/PlayerContext";
import { HandlerUserId } from "../services";
import s from "./GameSettings.module.css";

const Alias = () => {
  const { userNameId, connectionMessages, setUserNameId, errorAlias } =
    usePlayer();

  return (
    <div className={s.margindivs}>
      <h3>Alias</h3>
      <input
        value={userNameId}
        className={s.miinput}
        readOnly={connectionMessages?.connected === true ? true : false}
        type="text"
        placeholder="Ingresa tu alias"
        onChange={(event) => HandlerUserId(event, setUserNameId)}
      />
      {errorAlias.alias && (
        <h4>
          <small>{errorAlias.alias}</small>
        </h4>
      )}
    </div>
  );
};

export default Alias;
