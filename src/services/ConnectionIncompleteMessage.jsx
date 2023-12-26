const ConnectionIncompleteMessage = (connectionMessages) => {
  console.log("connectionMessages ->", connectionMessages);
  const incompleteConnection =
    "Esperando que se conecten todos los jugadores...";
  if (connectionMessages === "Conexion incompleta¡") {
    return incompleteConnection;
  }
};

export default ConnectionIncompleteMessage;
