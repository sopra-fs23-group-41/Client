import {useEffect, useRef, useState} from 'react';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import "styles/ui/Standings.scss";
import {useHistory} from "react-router-dom";
import {handleError} from "../../helpers/api";



const DelayBufferAfterLobby = () => {

    const [randomWisdom, setRandomWisdom] = useState('');
    const [onlyOnce, setOnlyOnce] = useState(true);

    function getRandom(max) { // The maximum is inclusive and the minimum is inclusive
        max = Math.floor(max);
        return Math.floor(Math.random() * (max + 1));
    }

    const currentRound = localStorage.getItem('currentRound')

    const timerId = useRef();
    const history = useHistory();

    const [countdown, setCountdown] = useState(3);


    //Countdown that decided the length of the Buffer
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
        doCountdown().catch((error) => {
            console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("An error occurred while executing the fetchData function! See the console for details.");
        });
    })


    //A list of wisdoms that shall keep the players entertained while waiting!
    useEffect(() => {
        const wisdoms =["Time is money.",
            "Time is money and I don't have either.",
            "The axe forgets, but the tree remembers.",
            "Money, like time, is a good servant but a bad master.",
            "Money can't buy happiness",
            "Money talks. Talk louder.",
            "Money makes the world go round.",
            "Money isn't everything, but it helps.",
            "Money is money.",
            "A bird in hand is worth two in the bush.",
            "Action speaks louder than words.",
            "After victory, tighten your helmet chord.",
            "A journey of thousand miles begins with a single step.",
            "A leopard doesn’t change its spots.",
            "Among the blind, one-eyed man is king."];
        if (onlyOnce) {
            setRandomWisdom(wisdoms[getRandom(wisdoms.length)]);
            setOnlyOnce(false);
        }
    }, [onlyOnce]);


    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <img className="multiplayer img" src={logo} alt="LOL"/>
                <h1 className="multiplayer title">Buffer</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>

            <div className="loading-wisdom">
                <h1>{randomWisdom}</h1>
            </div>

            <div className="loading ring">Loading
                <span></span>
            </div>
        </BaseContainer>
    );
}

export default DelayBufferAfterLobby;