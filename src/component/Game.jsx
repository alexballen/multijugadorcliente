import { usePlayer } from "../hooks/PlayerContext";
import {
  UpdatePlayersE,
  UserIdE,
  TotalOnlineUsersE,
  BothUsersConnectedE,
  PlayersQueueE,
  CurrentTurnE,
  WeHaveWinnerE,
  WinningUserE,
  ConnectionMessagesE,
  ConnectionErrorMessageE,
  DisconnectedUsersE,
  ScoreE,
  UserMovementsE,
  RestartTheGameE,
  RoundsE,
  NumberOfPlayersE,
  ChatMessageE,
  NicknameE,
  RoomE,
  ShotE,
  ClearStorageE,
} from "../events";
import {
  RoundsStorage,
  StoringWinningNumbers,
  SetErrorAlias,
  SetErrorRoom,
  SetErrorPlayers,
  SetErrorShot,
  SetGameOver,
  SetShowSettings,
  SetConnectionMessages,
} from "../services";
import GameSettings from "./GameSettings";
import {
  aliasValidator,
  roomValidator,
  playersValidator,
  shotValidator,
} from "../services/Validator";

const Game = () => {
  const {
    players,
    winningUsers,
    score,
    connectionMessages,
    storedRounds,
    roundsStorage,
    setRoundsStorage,
    storedWinningNumber,
    setStoredWinningNumber,
    rounds,
    numOfPlayers,
    userNameId,
    playersRoom,
    playerShot,
    setErrorAlias,
    setErrorRoom,
    setErrorPlayers,
    setErrorShot,
    setGameOver,
    setShowSettings,
    setConnectionMessages,
    setDisconnectedUsers,
  } = usePlayer();

  let connectedUsers = Object.keys(players).length;

  NicknameE();

  RoomE();

  ShotE();

  UpdatePlayersE();

  UserIdE();

  TotalOnlineUsersE(connectedUsers, playersRoom);

  BothUsersConnectedE(playersRoom);

  ConnectionMessagesE();

  ConnectionErrorMessageE();

  DisconnectedUsersE();

  PlayersQueueE();

  CurrentTurnE();

  ScoreE();

  UserMovementsE();

  WeHaveWinnerE(playersRoom);

  WinningUserE(playersRoom);

  RoundsStorage(storedRounds);

  StoringWinningNumbers(storedRounds, winningUsers);

  RestartTheGameE(
    roundsStorage,
    playersRoom,
    score,
    setRoundsStorage,
    storedWinningNumber,
    setStoredWinningNumber
  );

  RoundsE();

  NumberOfPlayersE();

  ChatMessageE();

  ClearStorageE();

  SetErrorAlias(setErrorAlias, aliasValidator, userNameId);

  SetErrorRoom(setErrorRoom, roomValidator, playersRoom);

  SetErrorPlayers(setErrorPlayers, playersValidator, numOfPlayers);

  SetErrorShot(setErrorShot, shotValidator, playerShot);

  SetGameOver(connectionMessages, rounds, roundsStorage, setGameOver);

  SetShowSettings(connectionMessages, setShowSettings);

  SetConnectionMessages(
    players,
    connectionMessages,
    setConnectionMessages,
    setDisconnectedUsers
  );

  return (
    <>
      <GameSettings />
    </>
  );
};

export default Game;
