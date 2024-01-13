import { useEffect, useState } from "react";
import { usePlayer } from "../hooks/PlayerContext";

const HasVibrationService = () => {
  const { turn, userId } = usePlayer();

  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  let esDispositivoMovil = window.matchMedia("(max-width: 767px)").matches;

  useEffect(() => {
    // Verificar si ya se ha solicitado el permiso previamente
    const permisoVibracionOtorgado = localStorage.getItem("permisoVibracion");

    if (!permisoVibracionOtorgado) {
      // Si no se ha otorgado el permiso, mostrar el modal
      setMostrarAlerta(true);
    }
  }, []);

  const solicitarPermisoVibracion = () => {
    // Cerrar el modal
    setMostrarAlerta(false);

    // Marcar que se ha otorgado el permiso
    localStorage.setItem("permisoVibracion", "otorgado");
  };

  useEffect(() => {
    if (esDispositivoMovil && mostrarAlerta) {
      alert("¿Permitir que la aplicación utilice la vibración?");
      solicitarPermisoVibracion();
    }
  }, [esDispositivoMovil, mostrarAlerta]);

  useEffect(() => {
    if (Object.keys(userId).length > 0 && Object.keys(turn).length > 0) {
      if (userId.userId === turn.user) {
        console.log(`Vibro en el usuario ${userId.userId}`);
        navigator.vibrate([1000]);
      }
    }
  }, [userId, turn]);
};

export default HasVibrationService;
