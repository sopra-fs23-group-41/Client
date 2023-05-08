import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {api} from "./api";
import Answer from "../models/Answer";

const Timer = ({seconds}) => {

    const history = useHistory();
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();


    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        async function handleCountdown() {
            if (countdown <= 0) {
                clearInterval(timerId.current);
                var currentRound = localStorage.getItem('currentRound');
                currentRound = parseInt(currentRound);

                const gameId = localStorage.getItem('gameId');
                const game = await api.get('/lobbies/' + gameId);


                if (currentRound >= game.data.rounds) {
                    history.push('endofgame');
                }
                else{
                    const hasAnswered = localStorage.getItem('hasAnswered')
                    if(hasAnswered === 'false'){
                        localStorage.setItem('hasAnswered', 'true')
                        const gameId = localStorage.getItem('gameId');
                        const playerId = localStorage.getItem('playerId')
                        const currentRound = localStorage.getItem('currentRound')
                        const playerAnswer = new Answer();
                        playerAnswer.playerId = playerId;
                        playerAnswer.timeUsed = 30;
                        playerAnswer.numOfRound = currentRound;
                        playerAnswer.playerAnswer = 0;

                        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
                    }
                    currentRound = currentRound + 1;
                    currentRound = currentRound.toString();
                    localStorage.setItem('currentRound', currentRound);
                    history.push('leaderboard');
                }
            }
        }
        handleCountdown();
    }, [countdown, history, timerId]);

    return (
        <div className="timer">
            <button type="button" className="timer__btn">
                <span className="timer__part">{countdown}</span>
            </button>
            <button type="button" className="timer__btn">
                <span className="material-icons">timer</span>
            </button>
        </div>
    )
}

export default Timer;