import { createContext, ReactNode, useEffect, useState } from 'react';

import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import LevelUpModal from '../components/LevelUpModal';

// State Interfaces

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

// Context Interfaces

interface ChallengeContextData{
    level: number;

    currentExperience: number;
    experienceToNextLevel: number;

    completedChallenges: number;
    activeChallenge: Challenge;

    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeModal: () => void;
}

interface ChallengesProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    completedChallenges: number
}

// Export Context

export const ChallengesContext = createContext({} as ChallengeContextData);

// Function for _App.tsx

export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [completedChallenges, setCompletedChallenges] = useState(rest.completedChallenges ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isModalOpened, setModalOpened] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('completedChallenges', String(completedChallenges));
    }, [level, currentExperience, completedChallenges]);
    
    function levelUp(){
        setLevel(level + 1)
        setModalOpened(true);
    }

    function closeModal(){
        setModalOpened(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);
        new Audio('/notification.mp3').play();

        /* if(Notification.permission === 'granted'){
            new Notification('Novo desafio',  {
                body: `Valendo ${challenge.amount} xp!`
            });
        } */
    }

    function completeChallenge(){
        if (!activeChallenge){
            return;
        }

        const {amount} = activeChallenge;

        let finalExperience = currentExperience + amount;

        if(finalExperience > experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setCompletedChallenges( completedChallenges + 1);
    }   

    function resetChallenge(){
        setActiveChallenge(null)
    }

    return(
        <ChallengesContext.Provider 
        value={{
            level, 
            currentExperience,
            experienceToNextLevel,
            completedChallenges,
            activeChallenge,
            levelUp, 
            startNewChallenge,
            resetChallenge,
            completeChallenge,
            closeModal
            }}>
            {children}
            { isModalOpened && <LevelUpModal></LevelUpModal>}
        </ChallengesContext.Provider>
    );
}