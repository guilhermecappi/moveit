import { useContext } from 'react';
import { ChallengesContext } from '../context/ChallengeContext';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext);
    const { resetCountdown } = useContext(CountdownContext);

    function handleChallengeFailed(){
        resetChallenge();
        resetCountdown();
    }

    function handleChallengeSucceed(){
        completeChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.challengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        { activeChallenge.type == 'body' ? <img src="icons/body.svg" alt=""/> : <img src="icons/eye.svg" alt=""/>}
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button type="button" className={styles.failedButton} onClick={handleChallengeFailed}>Falhei</button>
                        <button type="button" className={styles.succeededButton} onClick={handleChallengeSucceed}>Completei</button>
                    </footer>
                </div>
            ) : (
                <div className={styles.challengeNotActive}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt=""/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    )
}