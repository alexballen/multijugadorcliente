const ConnectionIncompleteMessage = (connectionMessages) => {
  const incompleteConnection =
    "Esperando que se conecten todos los jugadores...";
  if (connectionMessages.message === "Conexion incompleta¡") {
    return incompleteConnection;
  }
};

export default ConnectionIncompleteMessage;
