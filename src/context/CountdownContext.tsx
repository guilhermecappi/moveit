
import { ChallengesContext } from './ChallengeContext'
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface CountdownContextData {
    seconds: number;
    minutes: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
};

interface CountdownProviderProps{
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

export function CountdownProvider({children}: CountdownProviderProps){
    let countdownTimeout : NodeJS.Timeout;

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState( 25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    
    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdown() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime( 25 * 60);
        setHasFinished(false);
    }

    useEffect(()=>{
        if( isActive && time > 0){
            countdownTimeout = setTimeout(()=>{
                setTime(time - 1);
            }, 1000);
        } else if ( isActive && time == 0 ){
            setIsActive(false);
            setHasFinished(true);
            startNewChallenge();
        }
    }, [isActive, time])


    return(
        <CountdownContext.Provider 
        value={{
            seconds,
            minutes,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}