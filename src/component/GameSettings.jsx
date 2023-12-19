import { useEffect, useState, useRef } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import PropTypes from "prop-types";
import socket from "../socketSetup";
import { RestartE } from "../events";
import {
  ConnectionIncompleteMessage,
  UserDisconnectionMessage,
  HandlerChat,
} from "../services";
import Swal from "sweetalert2";
import s from "./GameSettings.module.css";

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
  } = usePlayer();
  const [gameOver, setGameOver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesContainerRef = useRef(null);

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
        setConnectionMessages((setMessage) => ({
          ...setMessage,
          message: "",
        }));
      }

      if (connectionMessages.message === "The shooting range cannot be empty") {
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
  }, [connectionMessages?.message]);

  useEffect(() => {
    if (connectionMessages?.connected) {
      if (Number(rounds) === roundsStorage.length) {
        setGameOver(true);
      } else {
        setGameOver(false);
      }
    }
  }, [rounds, roundsStorage]);

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

  let errorMessage = connectionErrorMessage.message;

  return (
    <div className={s.container}>
      <div className={s.title}>
        <h1>Nearby Number</h1>
      </div>

      {!showSettings && (
        <div className={s.nickname}>
          <div className={s.margindivs}>
            <h3>Nickname</h3>
            <input
              value={userNameId}
              className={s.miinput}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="text"
              placeholder="Enter your nickname"
              onChange={(event) => handleUserId(event)}
            />
          </div>
          <div className={s.margindivs}>
            <h3>Room name</h3>
            <input
              value={playersRoom}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="text"
              placeholder="Enter room name"
              onChange={(event) => handleRoomName(event)}
            />
          </div>
          <div className={s.margindivs}>
            <h3>Players per game</h3>
            <input
              value={numOfPlayers}
              readOnly={connectionMessages?.connected === true ? true : false}
              type="number"
              placeholder="Enter Number of players per game"
              onChange={(event) => handleNumberOfPlayers(event)}
            />
          </div>
          <div className={s.margindivs}>
            <h3>Number of rounds</h3>
            <div className={s.buttonselect}>
              <select
                value={rounds}
                disabled={connectionMessages?.connected === true ? true : false}
                onChange={(event) => handlerRoundsGame(event)}
              >
                <option disabled value="">
                  Rounds
                </option>
                <option value="3">3 Rounds</option>
                <option value="6">6 Rounds</option>
                <option value="9">9 Rounds</option>
              </select>
              <button
                disabled={connectionMessages?.connected === true ? true : false}
                onClick={() =>
                  HandlerNewUser(userNameId, playersRoom, numOfPlayers, rounds)
                }
              >
                Start setup
              </button>
            </div>
          </div>
          {errorMessage}
        </div>
      )}

      <div className={s.containerturnscore}>
        <div className={s.turn}>
          <h3>Turn:</h3>
          <h4>{turn.message}</h4>
          <button onClick={() => RestartE(playersRoom)}>Restart</button>
        </div>
        <div className={s.score}>
          <h3>Score:</h3>
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

      {showSettings && (
        <div className={s.containershotbutton}>
          <div className={s.containershot}>
            <h3>Player shot</h3>
            {!gameOver && (
              <input
                type="number"
                readOnly={
                  players[socket?.id]?.user !== turn.user ? true : false
                }
                placeholder="choose the number from 1 to 100"
                value={playerShot}
                onChange={(event) => handlePlayerShot(event)}
              />
            )}
          </div>

          <div className={s.containerbutton}>
            {!gameOver && (
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
                Send shot
              </button>
            )}
          </div>
        </div>
      )}

      <div className={s.containertable}>
        <h3>Score table</h3>
        <table>
          <thead>
            <tr className={s.trtitle}>
              <th>{playersQueue?.length ? "Shots" : ""}</th>
              {playersQueue.map((playUs, index) => (
                <th key={index}>{playUs}</th>
              ))}
              <th>{playersQueue?.length ? "Random" : ""}</th>
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

      {showSettings && (
        <div className={s.containerchat}>
          <h3>Game Chat</h3>
          <div ref={messagesContainerRef} className={s.messages}>
            {storedUserChatMessage.map((msm, index) => (
              <div className={s.containermap} key={index}>
                <span className={s.userName}>{msm.user}:</span>
                <span className={s.messageText}>{msm.message}</span>
              </div>
            ))}
          </div>
          <div className={s.containerinputchat}>
            <input
              type="text"
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
              Send
            </button>
          </div>
        </div>
      )}

      <div className={s.messages}>
        {ConnectionIncompleteMessage(connectionMessages)}
        {UserDisconnectionMessage(disconnectedUsers)}
      </div>
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
