import { useRef } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import { UserDisconnectionMessage, ScrollTop } from "../services";
import Alias from "./Alias";
import Room from "./Room";
import Rounds from "./Rounds";
import ReloadPage from "./ReloadPage";
import Players from "./Players";
import GoToPlay from "./GoToPlay";
import GoToPlay2 from "./GoToPlay2";
import NewGame from "./NewGame";
import GoOut from "./GoOut";
import Score from "./Score";
import Shot from "./Shot";
import SendShot from "./SendShot";
import ScoreBoard from "./ScoreBoard";
import MessageContainer from "./MessageContainer";
import SendMessages from "./SendMessages";
import s from "./GameSettings.module.css";

const GameSettings = () => {
  const {
    storedUserChatMessage,
    showSettings,
    connectionErrorMessage,
    connectionMessages,
    turn,
    disconnectedUsers,
  } = usePlayer();

  const messagesContainerRef = useRef(null);

  ScrollTop(messagesContainerRef, storedUserChatMessage);

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>Número + Cercano</h1>
      </div>

      {!showSettings && (
        <div className={s.nickname}>
          <h3 className={s.nicknametitle}>Configurar Sala de Juego</h3>
          <Alias />

          <Room />

          <Players />

          <div className={s.margindivs}>
            <h3>Rondas</h3>
            <div className={s.buttonselect}>
              <Rounds />

              <ReloadPage />

              <GoToPlay />
            </div>
          </div>
        </div>
      )}

      {!showSettings && (
        <div className={s.nickname}>
          <h3 className={s.nicknametitle}>Conectarse a Sala de Juego</h3>
          <Alias />

          <Room />

          <GoToPlay2 />

          {connectionErrorMessage.message && (
            <div className={s.connectionmsm}>
              {connectionErrorMessage.message}
            </div>
          )}
        </div>
      )}

      {showSettings && (
        <div className={s.containerturnscore}>
          <div className={s.turn}>
            <h3>Turno:</h3>
            <h4>{turn.message}</h4>

            <NewGame />

            <GoOut />
          </div>

          <Score />
        </div>
      )}

      {showSettings && (
        <div className={s.containershotbutton}>
          <Shot />

          <SendShot />
        </div>
      )}

      {showSettings && <ScoreBoard />}

      {showSettings && (
        <div className={s.containerchat}>
          <h3>Chat </h3>

          <MessageContainer messagesContainerRef={messagesContainerRef} />

          <SendMessages />
        </div>
      )}

      {!showSettings &&
        connectionMessages.message === "Conexion incompleta¡" && (
          <div className={s.containermsm}>
            <div className={s.connectionmsmerror}>
              <p>Esperando que se conecten todos los jugadores...</p>
            </div>
          </div>
        )}

      {!showSettings && disconnectedUsers && (
        <div className={s.containermsm}>
          <div className={s.connectionmsmerror}>
            {disconnectedUsers && UserDisconnectionMessage(disconnectedUsers)}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSettings;
