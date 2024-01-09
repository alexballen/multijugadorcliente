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
} from "../events";
import {
  HandlerNewUser,
  UserShotHandler,
  RoundsStorage,
  StoringWinningNumbers,
} from "../services";
import GameSettings from "./GameSettings";

const Game = () => {
  const {
    players,
    userId,
    playersQueue,
    turn,
    winningUsers,
    score,
    connectionMessages,
    disconnectedUsers,
    storedRounds,
    roundsStorage,
    setRoundsStorage,
    storedWinningNumber,
    setStoredWinningNumber,
    connectionErrorMessage,
    rounds,
    setRounds,
    numOfPlayers,
    setNumOfPlayers,
    userNameId,
    setUserNameId,
    playersRoom,
    setPlayersRoom,
    playerShot,
    setPlayerShot,
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

  const handleUserId = (event) => {
    const lowercaseValue = event.target.value.toLowerCase();
    setUserNameId(lowercaseValue);
  };

  const handleRoomName = (event) => {
    const lowercaseValue = event.target.value.toLowerCase();
    setPlayersRoom(lowercaseValue);
  };

  const handleNumberOfPlayers = (event) => {
    setNumOfPlayers(event.target.value);
  };

  const handlerRoundsGame = (event) => {
    setRounds(event.target.value);
  };

  const handlePlayerShot = (event) => {
    setPlayerShot(event.target.value);
  };

  return (
    <>
      <GameSettings
        connectionMessages={connectionMessages}
        handleUserId={handleUserId}
        handleRoomName={handleRoomName}
        handleNumberOfPlayers={handleNumberOfPlayers}
        HandlerNewUser={HandlerNewUser}
        userNameId={userNameId}
        playersRoom={playersRoom}
        numOfPlayers={numOfPlayers}
        players={players}
        playerShot={playerShot}
        setPlayerShot={setPlayerShot}
        userId={userId}
        turn={turn}
        handlePlayerShot={handlePlayerShot}
        UserShotHandler={UserShotHandler}
        score={score}
        playersQueue={playersQueue}
        roundsStorage={roundsStorage}
        storedWinningNumber={storedWinningNumber}
        disconnectedUsers={disconnectedUsers}
        handlerRoundsGame={handlerRoundsGame}
        rounds={rounds}
        connectionErrorMessage={connectionErrorMessage}
      />
    </>
  );
};

export default Game;
