import { usePlayer } from "../hooks/PlayerContext";
import PropTypes from "prop-types";
import s from "./GameSettings.module.css";

const MessageContainer = ({ messagesContainerRef }) => {
  const { storedUserChatMessage } = usePlayer();

  return (
    <div ref={messagesContainerRef} className={s.messages}>
      {storedUserChatMessage?.map((msm, index) => (
        <div className={s.containermap} key={index}>
          <span className={s.userName}>{msm.user}:</span>
          <div className={s.containertexttime}>
            <span className={s.messageText}>{msm.message}</span>
            <span className={s.messageTime}>{msm.timestamp}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

MessageContainer.propTypes = {
  messagesContainerRef: PropTypes.object,
};

export default MessageContainer;
