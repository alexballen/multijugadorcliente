import { useEffect, useRef } from "react";
import { usePlayer } from "../hooks/PlayerContext";
import socket from "../socketSetup";
import { Winners } from "../services";
import Swal from "sweetalert2";

const RestartTheGameE = (
  roundsStorage,
  playersRoom,
  score,
  setRoundsStorage,
  storedWinningNumber,
  setStoredWinningNumber
) => {
  const storageRef = useRef(storedWinningNumber);
  const { players, rounds } = usePlayer();

  useEffect(() => {
    storageRef.current = storedWinningNumber;
  }, [storedWinningNumber]);

  useEffect(() => {
    socket.on("confirmRestartNn", (confirmRestart) => {
      const { confirm } = confirmRestart;

      if (storageRef.current.length > 0 && confirm) {
        const ganadores = Winners(score);

        let remainingTime = 10;
        let timerInterval;

        Swal.fire({
          title: "Reiniciando juego¡",
          html: `<p>Ganador(es):</p>${ganadores
            .map((jugador) => `${jugador}`)
            .join(
              ""
            )}</br></br> <p>El juego se reinicia en <b>${remainingTime}</b> segundos¡</p>`,
          timer: 10000,
          timerProgressBar: true,
          allowOutsideClick: false,

          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              remainingTime--;
              timer.textContent = `${remainingTime}`;
            }, 1000);
          },

          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            socket.emit("restartTheGameNn", {
              confirm: true,
              room: playersRoom,
            });

            localStorage.removeItem("rounds");
            localStorage.removeItem("storingWinningNumbers");
            setRoundsStorage([]);
            setStoredWinningNumber([]);
          }
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "warning",
          title: "No hay datos que reiniciar¡",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }, [roundsStorage]);

  useEffect(() => {
    if (Object.keys(players).length > 0) {
      if (roundsStorage?.length === Number(rounds)) {
        const ganadores = Winners(score);
        Swal.fire({
          title: "Jugador(es) gandor(es)¡",
          html: `<p>Ganador(es):</p>${ganadores
            .map((jugador) => `${jugador}`)
            .join("")}`,
          allowOutsideClick: false,
        });
      }
    }
  }, [roundsStorage]);
};

export default RestartTheGameE;
