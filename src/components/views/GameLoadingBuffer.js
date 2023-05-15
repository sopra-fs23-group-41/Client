
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import "styles/ui/Standings.scss";
import TimerLeaderboard from "../../helpers/TimerLeaderboard";
import {api, handleError} from "../../helpers/api";
import {useCallback, useEffect, useState} from "react";



const GameLoadingBuffer = () => {

    const history = new useHistory();

    //const isGm = localStorage.getItem('isGm')
    let time = 5;

    const isGm = localStorage.getItem('isGm');
    const gameId = localStorage.getItem('gameId')
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')

    const [onlyOnce, setOnlyOnce] = useState(true);


    const startNextRound = useCallback(async () => {
        try {
            await api.get('/lobbies/' + gameId + '/nextRound')
        } catch (error) {
            console.log('Something went wrong')
        }
    }, [gameId]);

    useEffect(() => {
        if(isGm === 'true' && onlyOnce) {
            setOnlyOnce(false);
            startNextRound();
        }
    },[isGm, onlyOnce, startNextRound]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const interval = setInterval(() => {
            async function isNewRoundStarted(gameId) {
                try {

                    // To check if the nextRound has been initialized
                    const beginCheck = await api.get('/lobbies/'+gameId+'/QuestionStatus/'+playerId);
                    const begin = beginCheck.data;
                    console.log(begin);
                    if (begin === 'true') {
                        console.log("hmmmm")
                        if(localStorage.getItem('gameMode') === 'GuessThePrice'){
                            history.push('gtpgame')
                        }else if(localStorage.getItem('gameMode') === 'HighOrLow'){
                            history.push('higher-or-lower-game')
                        }else if(localStorage.getItem('gameMode') === 'MostExpensiveItem'){
                            history.push('most-expensive-item')
                        }else{
                            if(parseInt(currentRound) % 3 === 0){
                                history.push('gtpgame')
                            }else if(parseInt(currentRound) % 3 === 1){
                                history.push('most-expensive-item')
                            }else{
                                history.push('higher-or-lower-game')
                            }
                        }

                    }
                } catch (error) {
                    alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
                }
            }
            isNewRoundStarted(gameId);
        }, 1000);
        return () => clearInterval(interval);
    }, [gameId, history, playerId, currentRound]);

    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing">
                            <button className="multiplayer home-button">Home</button>
                        </a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Wait to load into Game...</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>


            <h1 className="next-question-title">Game starts in:</h1>
            <div className="next-question-timer">
                <TimerLeaderboard seconds={time}/>
            </div>



        </BaseContainer>
    );
}

export default GameLoadingBuffer;