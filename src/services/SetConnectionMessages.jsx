import { useEffect } from "react";
import Swal from "sweetalert2";

const SetConnectionMessages = (
  players,
  connectionMessages,
  setConnectionMessages,
  setDisconnectedUsers
) => {
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
};

export default SetConnectionMessages;
