import {useEffect, useRef, useState} from "react";

const Timer = ({seconds}) => {
    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCountdown(prev => prev -1)
        }, 1000)
        return () => clearInterval(timerId.current)
    }, [])

    useEffect(() => {
        if (countdown <= 0){
            clearInterval(timerId.current)
            alert("Round is Over")
        }
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

export default Timer;