import { useEffect, useState, useRef } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import PropTypes from "prop-types";
import socket from "../socketSetup";
import { RestartE } from "../events";
import {
  UserDisconnectionMessage,
  HandlerChat,
  HandleReload,
} from "../services";
import Swal from "sweetalert2";
import s from "./GameSettings.module.css";
import { TfiReload } from "react-icons/tfi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { MdRestartAlt } from "react-icons/md";
import { GoPlay } from "react-icons/go";
import {
  aliasValidator,
  roomValidator,
  playersValidator,
  shotValidator,
} from "../services/Validator";

const GameSettings = ({
  connectionMessages,
  handleUserId,
  handleRoomName,
  handleNumberOfPlayers,
  HandlerNewUser,
  userNameId,
  playersRoom,
  numOfPlayers,
  players,
  playerShot,
  setPlayerShot,
  userId,
  turn,
  handlePlayerShot,
  UserShotHandler,
  score,
  playersQueue,
  roundsStorage,
  storedWinningNumber,
  disconnectedUsers,
  handlerRoundsGame,
  rounds,
  connectionErrorMessage,
}) => {
  const {
    setConnectionMessages,
    setDisconnectedUsers,
    userChatMessage,
    setUserChatMessage,
    storedUserChatMessage,
    setRoundsStorage,
    setStoredWinningNumber,
  } = usePlayer();
  const messagesContainerRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [errorAlias, setErrorAlias] = useState({});
  const [errorRoom, setErrorRoom] = useState({});
  const [errorPlayers, setErrorPlayers] = useState({});
  const [errorShot, setErrorShot] = useState({});
  const [chatTimestamp, setChatTimestamp] = useState("");

  console.log("connectionMessages ->", connectionMessages);

  useEffect(() => {
    if (Object.keys(players).length > 0) {
      if (connectionMessages.message === "Conexion completa¡") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Conexion completa¡",
          showConfirmButton: false,
          timer: 1500,
        });
        setConnectionMessages((setMessage) => ({
          ...setMessage,
          message: "",
        }));
        setDisconnectedUsers("");
      }

      if (connectionMessages.message === "Conexion incompleta¡") {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Conexion incompleta¡",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      if (
        connectionMessages.message === "El campo de tiro no puede estar vacío"
      ) {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "Campo tiro no puede estar vacio¡",
          showConfirmButton: false,
          timer: 1500,
        });
        setConnectionMessages((setMessage) => ({
          ...setMessage,
          message: "",
        }));
      }
    }
  }, [
    connectionMessages?.message,
    setConnectionMessages,
    setDisconnectedUsers,
    players,
  ]);

  useEffect(() => {
    if (connectionMessages?.connected) {
      if (Number(rounds) === roundsStorage.length) {
        setGameOver(true);
      } else {
        setGameOver(false);
      }
    }
  }, [rounds, roundsStorage, connectionMessages?.connected]);

  useEffect(() => {
    if (connectionMessages.connected) {
      setShowSettings(true);
    } else {
      setShowSettings(false);
    }
  }, [connectionMessages.connected]);

  useEffect(() => {
    if (messagesContainerRef.current && storedUserChatMessage.length > 0) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [storedUserChatMessage]);

  useEffect(() => {
    setErrorAlias(aliasValidator(userNameId));
  }, [userNameId, setErrorAlias]);

  useEffect(() => {
    setErrorRoom(roomValidator(playersRoom));
  }, [playersRoom, setErrorRoom]);

  useEffect(() => {
    setErrorPlayers(playersValidator(numOfPlayers));
  }, [numOfPlayers, setErrorPlayers]);

  useEffect(() => {
    setErrorShot(shotValidator(playerShot));
  }, [playerShot, setErrorShot]);

  const getCurrentTime = () => {
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/Bogota",
    };
    const formattedTime = new Intl.DateTimeFormat("es-CO", options).format(now);
    return formattedTime;
  };

  useEffect(() => {
    const currentTime = getCurrentTime();
    setChatTimestamp(currentTime);
  }, [userChatMessage.length]);

  useEffect(() => {
    socket.on("clearLocalStorage", (clear) => {
      if (clear) {
        localStorage.removeItem("rounds");
        localStorage.removeItem("storingWinningNumbers");
        setRoundsStorage([]);
        setStoredWinningNumber([]);
      }
    });
  }, []);

  let errorMessage = connectionErrorMessage.message;

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>Número + Cercano</h1>
      </div>

      {!showSettings && (
        <div className={s.nickname}>
          <h3 className={s.nicknametitle}>Configurar Sala de Juego</h3>
          <div className={s.margindivs}>
            <h3>Alias</h3>
            <input
              value={userNameId}
              className={s.miinput}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="text"
              placeholder="Ingresa tu alias"
              onChange={(event) => handleUserId(event)}
            />
            {errorAlias.alias && (
              <h4>
                <small>{errorAlias.alias}</small>
              </h4>
            )}
          </div>
          <div className={s.margindivs}>
            <h3>Sala</h3>
            <input
              value={playersRoom}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="text"
              placeholder="Ingresa sala de juego"
              onChange={(event) => handleRoomName(event)}
            />
            {errorRoom.room && (
              <h4>
                <small>{errorRoom.room}</small>
              </h4>
            )}
          </div>
          <div className={s.margindivs}>
            <h3>Jugadores</h3>
            <input
              value={numOfPlayers}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="number"
              placeholder="Ingrese el número de jugadores por juego"
              onChange={(event) => handleNumberOfPlayers(event)}
            />
            {errorPlayers.players && (
              <h4>
                <small>{errorPlayers.players}</small>
              </h4>
            )}
          </div>
          <div className={s.margindivs}>
            <h3>Rondas</h3>
            <div className={s.buttonselect}>
              <div className={s.select}>
                <select
                  value={rounds}
                  disabled={
                    connectionMessages?.connected === true ? true : false
                  }
                  onChange={(event) => handlerRoundsGame(event)}
                >
                  <option disabled value="">
                    Rondas
                  </option>
                  <option value="3">3 Rondas</option>
                  <option value="7">7 Rondas</option>
                  <option value="11">11 Rondas</option>
                  <option value="15">15 Rondas</option>
                  <option value="19">19 Rondas</option>
                  <option value="23">23 Rondas</option>
                  <option value="27">27 Rondas</option>
                  <option value="31">31 Rondas</option>
                </select>
              </div>
              <div className={s.containerTfiReload}>
                <button>
                  <TfiReload
                    className={s.tfireload}
                    onClick={() =>
                      HandleReload(
                        players,
                        Swal,
                        "reload",
                        userNameId,
                        playersRoom,
                        numOfPlayers,
                        rounds
                      )
                    }
                  />
                  <p>Recargar</p>
                </button>
              </div>
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
                      HandlerNewUser(
                        userNameId,
                        playersRoom,
                        numOfPlayers,
                        rounds
                      )
                    }
                  />
                  <p>Iniciar</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!showSettings && (
        <div className={s.nickname}>
          <h3 className={s.nicknametitle}>Conectarse a Sala de Juego</h3>
          <div className={s.margindivs}>
            <h3>Alias</h3>
            <input
              value={userNameId}
              className={s.miinput}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="text"
              placeholder="Ingresa tu alias"
              onChange={(event) => handleUserId(event)}
            />
            {errorAlias.alias && (
              <h4>
                <small>{errorAlias.alias}</small>
              </h4>
            )}
          </div>
          <div className={s.margindivs}>
            <h3>Sala</h3>
            <input
              value={playersRoom}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="text"
              placeholder="Ingresa sala de juego"
              onChange={(event) => handleRoomName(event)}
            />
            {errorRoom.room && (
              <h4>
                <small>{errorRoom.room}</small>
              </h4>
            )}
          </div>
          <div className={s.containergoplay}>
            <button
              disabled={
                Object.keys(errorAlias).length < 1 &&
                Object.keys(errorRoom).length < 1
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
          {errorMessage && (
            <div className={s.connectionmsm}>{errorMessage}</div>
          )}
        </div>
      )}

      {showSettings && (
        <div className={s.containerturnscore}>
          <div className={s.turn}>
            <h3>Turno:</h3>
            <h4>{turn.message}</h4>
            <div className={s.containerTfiReload}>
              <button>
                <MdRestartAlt
                  className={s.tfireload}
                  onClick={() => RestartE(playersRoom)}
                />
                <p>Reiniciar</p>
              </button>
            </div>
            <div className={s.containerTfiReload}>
              <button>
                <RiLogoutCircleRLine
                  className={s.tfireload}
                  onClick={() => HandleReload(players, Swal, "")}
                />
                <p>Salir</p>
              </button>
            </div>
          </div>
          <div className={s.score}>
            <h3>Puntaje:</h3>
            <div className={s.scoremap}>
              {Object.keys(userId).length
                ? score &&
                  Object.keys(score).map((user) => (
                    <div key={user} className={s.scoremapitem}>
                      {user}:{score[user]}
                    </div>
                  ))
                : ""}
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className={s.containershotbutton}>
          <div className={s.containershot}>
            <h3>Tiro</h3>
            {!gameOver && (
              <input
                type="number"
                readOnly={
                  players[socket?.id]?.user !== turn.user ? true : false
                }
                placeholder="Elige un número del 1 al 100"
                value={playerShot}
                onChange={(event) => handlePlayerShot(event)}
              />
            )}
            {!gameOver && errorShot.shot && (
              <h4>
                <small>{errorShot.shot}</small>
              </h4>
            )}
          </div>

          <div className={s.containerbutton}>
            {!gameOver && Object.keys(errorShot).length < 1 && (
              <button
                disabled={
                  players[socket?.id]?.user !== turn?.user ? true : false
                }
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
        </div>
      )}

      {showSettings && (
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
      )}

      {showSettings && (
        <div className={s.containerchat}>
          <h3>Chat </h3>
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
                  setUserChatMessage,
                  chatTimestamp
                )
              }
            >
              Enviar
            </button>
          </div>
        </div>
      )}

      {!showSettings &&
        !connectionMessages.connected &&
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

GameSettings.propTypes = {
  connectionMessages: PropTypes.object,
  handleUserId: PropTypes.func,
  handleRoomName: PropTypes.func,
  handleNumberOfPlayers: PropTypes.func,
  HandlerNewUser: PropTypes.func,
  userNameId: PropTypes.string,
  playersRoom: PropTypes.string,
  numOfPlayers: PropTypes.string,
  players: PropTypes.object,
  playerShot: PropTypes.string,
  setPlayerShot: PropTypes.func,
  userId: PropTypes.object,
  turn: PropTypes.object,
  handlePlayerShot: PropTypes.func,
  UserShotHandler: PropTypes.func,
  score: PropTypes.object,
  playersQueue: PropTypes.array,
  roundsStorage: PropTypes.array,
  storedWinningNumber: PropTypes.array,
  handleRestart: PropTypes.func,
  disconnectedUsers: PropTypes.string,
  handlerRoundsGame: PropTypes.func,
  rounds: PropTypes.string,
  connectionErrorMessage: PropTypes.object,
};

export default GameSettings;
