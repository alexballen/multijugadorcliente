import { usePlayer } from "../hooks/PlayerContext";
import { HandlerChat } from "../services";
import s from "./GameSettings.module.css";

const SendMessages = () => {
  const { userChatMessage, setUserChatMessage, playersRoom, userNameId } =
    usePlayer();

  return (
    <div className={s.containerinputchat}>
      <input
        type="text"
        placeholder="Ingresa tu mensaje"
        value={userChatMessage}
        onChange={(event) => setUserChatMessage(event.target.value)}
      />
      <button
        onClick={() =>
          HandlerChat(
            playersRoom,
            userNameId,
            userChatMessage,
            setUserChatMessage
          )
        }
      >
        Enviar
      </button>
    </div>
  );
};

export default SendMessages;
