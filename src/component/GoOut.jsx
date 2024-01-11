import { usePlayer } from "../hooks/PlayerContext";
import { HandleReload } from "../services";
import { RiLogoutCircleRLine } from "react-icons/ri";
import s from "./GameSettings.module.css";

const GoOut = () => {
  const { players } = usePlayer();

  return (
    <div className={s.containerTfiReload}>
      <button>
        <RiLogoutCircleRLine
          className={s.tfireload}
          onClick={() => HandleReload(players, "")}
        />
        <p>Salir</p>
      </button>
    </div>
  );
};

export default GoOut;
