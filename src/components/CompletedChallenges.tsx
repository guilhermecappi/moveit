import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallanges(){
    const { completedChallenges } = useContext(ChallengesContext)

    return(
        <div className={styles.challangeContainer}>
            <span>Desafios completos</span>
            <span>{completedChallenges}</span>
        </div>
    );
}