const ConnectionIncompleteMessage = (connectionMessages) => {
  const incompleteConnection =
    "Esperando que se conecten todos los jugadores...";
  if (connectionMessages?.message) {
    return incompleteConnection;
  }
};

export default ConnectionIncompleteMessage;
