import Head from 'next/head';
import {GetServerSideProps} from 'next';

//css
import styles from '../styles/pages/Home.module.css';

//components
import { ExperienceBar } from "../components/ExperienceBar";
import Profile from '../components/Profile';
import CompletedChallanges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';
import { CountdownProvider } from '../context/CountdownContext';
import { ChallengesProvider } from '../context/ChallengeContext';


interface HomeProps{
  level: number;
  currentExperience: number;
  completedChallenges: number
}

export default function Home(props) {
  return (
    <div className={styles.container}>
      <ChallengesProvider
        level={props.level}
        currentExperience={props.currentExperience}
        completedChallenges={props.completedChallenges}
      >
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
              <div>
                <Profile />
                <CompletedChallanges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
        </CountdownProvider>
      </ChallengesProvider>
    </div>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) =>{
  const {level, currentExperience, completedChallenges} = ctx.req.cookies;

  return {
    props: {
      level: Number(level), 
      currentExperience: Number(currentExperience),
      completedChallenges: Number(completedChallenges)
    }
  }
}