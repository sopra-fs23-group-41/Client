import {useEffect, useRef, useState} from "react";
import {useHistory} from "react-router-dom";
import {handleError} from "./api";
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
            if (countdown <= 0){
                history.push('delay-buffer-after-lobby')
            }
        }
        doCountdown().catch((error) => {
            console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("An error occurred while executing the fetchData function! See the console for details.");
        });
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