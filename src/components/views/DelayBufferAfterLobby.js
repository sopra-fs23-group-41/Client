import {useEffect, useRef, useState} from 'react';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import "styles/ui/Standings.scss";
import {useHistory} from "react-router-dom";



const DelayBufferAfterLobby = () => {


    const currentRound = localStorage.getItem('currentRound')

    const timerId = useRef();
    const history = useHistory();

    const [countdown, setCountdown] = useState(3);

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
                history.push('most-expensive-item-game')
            }else if(countdown <= 0 && localStorage.getItem('gameMode') === 'Mix'){
                if(currentRound % 3 === 1){
                    history.push('gtpgame')
                }else if(currentRound % 3 === 2){
                    history.push('most-expensive-item-game')
                }else{
                    history.push('higher-or-lower-game')
                }
            }
        }
        doCountdown();
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

export default DelayBufferAfterLobby;