import { usePlayer } from "../hooks/PlayerContext";
import s from "./GameSettings.module.css";

const Score = () => {
  const { userId, score } = usePlayer();

  return (
    <div className={s.score}>
      <h3>Puntaje:</h3>
      <div className={s.scoremap}>
        {Object.keys(userId).length
          ? score &&
            Object.keys(score).map((user) => (
              <div key={user} className={s.scoremapitem}>
                {user}:{score[user]}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Score;
