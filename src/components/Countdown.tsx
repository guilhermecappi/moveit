import { useState, useEffect, useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/Countdown.module.css'



export default function Countdown(){
    const { seconds, 
            minutes, 
            hasFinished, 
            isActive, 
            startCountdown, 
            resetCountdown 
    } = useContext(CountdownContext);

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button
                disabled 
                type="button" 
                className={styles.countdownButton}
                >
                    Ciclo encerrado <i className="fas fa-check-circle" style={{ marginLeft: '1rem', color: 'var(--green)'}}></i>
                </button>
            ): (
                <>
                { isActive ? (
                    <button 
                    type="button"
                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
                    onClick={resetCountdown}>
                        Abandonar ciclo <i className="fas fa-times" style={{ marginLeft: "1rem"}}></i>
                    </button>
                    ) : (
                    
                    <button 
                    type="button" 
                    className={styles.countdownButton} 
                    onClick={startCountdown}>
                        Iniciar um ciclo <i className="fas fa-play" style={{ marginLeft: "1rem"}}></i>
                    </button>
                )}
                </>
            )}
            
        </div>
    );
}