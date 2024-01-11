import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Crea el contexto
const PlayerContext = createContext();

// Proporciona un componente proveedor que envolverá toda tu aplicación
export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState({});
  const [userId, setUserId] = useState({});
  const [bothUsersConnected, setBothUsersConnected] = useState(false);
  const [connectionMessages, setConnectionMessages] = useState({});
  const [connectionErrorMessage, setConnectionErrorMessage] = useState({});
  const [playersQueue, setPlayersQueue] = useState([]);
  const [turn, setTurn] = useState({});
  const [thereIsAWinner, setThereIsAWinner] = useState(false);
  const [randomNumber, setRandomNumber] = useState(0);
  const [winningUsers, setWinningUsers] = useState([]);
  const [score, setScore] = useState({});
  const [disconnectedUsers, setDisconnectedUsers] = useState("");
  const [storedRounds, setStoredRounds] = useState([]);
  const [roundsStorage, setRoundsStorage] = useState([]);
  const [storedWinningNumber, setStoredWinningNumber] = useState([]);
  const [rounds, setRounds] = useState("");
  const [numOfPlayers, setNumOfPlayers] = useState("");
  const [userChatMessage, setUserChatMessage] = useState("");
  const [storedUserChatMessage, setStoredUserChatMessage] = useState([]);
  const [playersRoom, setPlayersRoom] = useState("");
  const [userNameId, setUserNameId] = useState("");
  const [playerShot, setPlayerShot] = useState("");
  const [errorAlias, setErrorAlias] = useState({});
  const [errorRoom, setErrorRoom] = useState({});
  const [errorPlayers, setErrorPlayers] = useState({});
  const [errorShot, setErrorShot] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <PlayerContext.Provider
      value={{
        players,
        setPlayers,
        userId,
        setUserId,
        bothUsersConnected,
        setBothUsersConnected,
        connectionMessages,
        setConnectionMessages,
        connectionErrorMessage,
        setConnectionErrorMessage,
        playersQueue,
        setPlayersQueue,
        turn,
        setTurn,
        thereIsAWinner,
        setThereIsAWinner,
        randomNumber,
        setRandomNumber,
        winningUsers,
        setWinningUsers,
        score,
        setScore,
        disconnectedUsers,
        setDisconnectedUsers,
        storedRounds,
        setStoredRounds,
        roundsStorage,
        setRoundsStorage,
        storedWinningNumber,
        setStoredWinningNumber,
        rounds,
        setRounds,
        numOfPlayers,
        setNumOfPlayers,
        userChatMessage,
        setUserChatMessage,
        storedUserChatMessage,
        setStoredUserChatMessage,
        playersRoom,
        setPlayersRoom,
        userNameId,
        setUserNameId,
        playerShot,
        setPlayerShot,
        errorAlias,
        setErrorAlias,
        errorRoom,
        setErrorRoom,
        errorPlayers,
        setErrorPlayers,
        errorShot,
        setErrorShot,
        gameOver,
        setGameOver,
        showSettings,
        setShowSettings,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

PlayerProvider.propTypes = {
  children: PropTypes.node,
};

export const usePlayer = () => {
  return useContext(PlayerContext);
};
