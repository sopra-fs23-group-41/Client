import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
//import {api} from "./api";

const TimerLeaderboard = ({seconds}) => {

    const history = useHistory();
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect( () => {
        async function doCountdown(){
            if (countdown <= 0) {
                clearInterval(timerId.current)
                history.push('gtpgame')
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