import { usePlayer } from "../hooks/PlayerContext";
import { HandlerRoundsGame } from "../services";
import s from "./GameSettings.module.css";

const Rounds = () => {
  const { rounds, connectionMessages, setRounds } = usePlayer();

  return (
    <div className={s.select}>
      <select
        value={rounds}
        disabled={connectionMessages?.connected === true ? true : false}
        onChange={(event) => HandlerRoundsGame(event, setRounds)}
      >
        <option disabled value="">
          Rondas
        </option>
        <option value="3">3 Rondas</option>
        <option value="7">7 Rondas</option>
        <option value="11">11 Rondas</option>
        <option value="15">15 Rondas</option>
        <option value="19">19 Rondas</option>
        <option value="23">23 Rondas</option>
        <option value="27">27 Rondas</option>
        <option value="31">31 Rondas</option>
      </select>
    </div>
  );
};

export default Rounds;
