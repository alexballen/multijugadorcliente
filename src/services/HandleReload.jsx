import Swal from "sweetalert2";

const HandleReload = (
  players,
  string,
  userNameId,
  playersRoom,
  numOfPlayers,
  rounds
) => {
  if (string === "reload") {
    if (
      Object.keys(players).length > 0 ||
      userNameId ||
      playersRoom ||
      numOfPlayers ||
      rounds
    ) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Pagina recargada¡",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload();
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "No hay datos¡",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Salio del Juego correctamente¡",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.reload();
    });
  }
};

export default HandleReload;
