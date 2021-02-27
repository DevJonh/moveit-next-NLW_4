import { useContext } from "react";
import { ChallengesContext } from "../../contexts/ChallengesContext";
import style from "./styles.module.css";

const Profile = () => {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={style.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/53903172?s=400&u=7f3d1459c4d036cb83eb38327d246019261c090f&v=4"
        alt="Jhonny Oliveira"
      />
      <div>
        <strong>Jônatas Oliveira</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};

export default Profile;
