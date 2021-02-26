import { useContext } from 'react';

import { ChallengesContext } from '../context/ChallengeContext';

import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){
    const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

    const percent = Math.round((currentExperience * 100)) / experienceToNextLevel;

    return(
        <header className={styles.experienceBar}>
            <span>0 xp</span>

            <div>

                <div style={{width: `${percent}%`}}/>
                <span className={styles.currentExperience} style={{ left: `${percent}%`}}>
                    {currentExperience} xp
                </span>

            </div>

            <span>{experienceToNextLevel} xp</span>
        </header>
    );
}