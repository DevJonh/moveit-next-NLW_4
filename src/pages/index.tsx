import { GetServerSideProps } from "next";
import Head from "next/head";

import ChallengeBox from "../components/ChallegenBox";
import CompletedChallenges from "../components/CompleteChallenges";
import CountDown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountDownProvider } from "../contexts/CountDownContext";

import style from "../styles/home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

const Home = ({ level, currentExperience, challengesCompleted }: HomeProps) => {
  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <Head>
        <title>Início - MoveIt</title>
      </Head>
      <div className={style.container}>
        <ExperienceBar />

        <CountDownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountDownProvider>
      </div>
    </ChallengesProvider>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
