import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
//import {api} from "./api";

const TimerLeaderboard = ({seconds}) => {

    const history = useHistory();
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();
    const currentRound = parseInt(localStorage.getItem('currentRound'));

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect( () => {
        async function doCountdown(){
            if (countdown <= 0 && localStorage.getItem('gameMode') === 'GuessThePrice') {
                clearInterval(timerId.current)
                history.push('gtpgame')
            }
            else if (countdown <= 0 && localStorage.getItem('gameMode') === 'HighOrLow'){
                clearInterval(timerId.current)
                history.push('higher-or-lower-game')
            }
            else if (countdown <= 0 && localStorage.getItem('gameMode') === 'MostExpensive'){
                clearInterval(timerId.current)
                history.push('most-expensive-item')
            }else if(countdown <= 0 && localStorage.getItem('gameMode') === 'Mix'){
                if(currentRound % 3 === 1){
                    history.push('gtpgame')
                }else if(currentRound % 3 === 2){
                    history.push('most-expensive-item')
                }else{
                    history.push('higher-or-lower-game')
                }
            }
        }
        doCountdown();
    })

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

export default TimerLeaderboard;