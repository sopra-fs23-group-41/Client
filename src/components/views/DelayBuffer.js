import { useEffect, useRef, useState} from 'react';
import {handleError} from 'helpers/api';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import "styles/ui/Standings.scss";
import {useHistory} from "react-router-dom";



const DelayBuffer = () => {


    const timerId = useRef();
    const history = useHistory();

    const [countdown, setCountdown] = useState(5);

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
                history.push('leaderboard')
            }
        }
        doCountdown().catch((error) => {
            console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("An error occurred while executing the fetchData function! See the console for details.");
        });
    })



    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <img className="multiplayer img" src={logo} alt="LOL"/>
                <h1 className="multiplayer title">Buffer</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>

            <div className="loading ring">Loading
                <span></span>
            </div>
        </BaseContainer>
    );
}

export default DelayBuffer;