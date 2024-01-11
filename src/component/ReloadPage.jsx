import { usePlayer } from "../hooks/PlayerContext";
import { HandleReload } from "../services";
import { TfiReload } from "react-icons/tfi";
import s from "./GameSettings.module.css";

const ReloadPage = () => {
  const { players, userNameId, playersRoom, rounds } = usePlayer();

  return (
    <div className={s.containerTfiReload}>
      <button>
        <TfiReload
          className={s.tfireload}
          onClick={() =>
            HandleReload(players, "reload", userNameId, playersRoom, rounds)
          }
        />
        <p>Recargar</p>
      </button>
    </div>
  );
};

export default ReloadPage;
