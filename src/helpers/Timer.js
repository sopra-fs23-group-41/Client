import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {api} from "./api";

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
                console.log(game);
                console.log(currentRound);
                console.log(game.data.rounds);

                if (currentRound >= game.data.rounds) {
                    console.log('Hello there')
                    history.push('endofgame');
                }
                else{
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