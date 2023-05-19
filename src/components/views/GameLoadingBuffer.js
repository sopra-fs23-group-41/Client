
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import "styles/ui/Standings.scss";
import {api, handleError} from "../../helpers/api";
import {useCallback, useEffect, useRef, useState} from "react";
import "styles/views/LoadingBuffer.scss";


const GameLoadingBuffer = () => {

    const history = useHistory();


    const isGm = localStorage.getItem('isGm');
    const gameId = localStorage.getItem('gameId')
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')

    const [onlyOnce, setOnlyOnce] = useState(true);
    const [countdown, setCountdown] = useState(5);
    const timerId = useRef();



    const startNextRound = useCallback(async () => {
        try {
            await api.get('/lobbies/' + gameId + '/nextRound')
            console.log("New round has been initialized")
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
                        console.log(begin)
                        if(localStorage.getItem('gameMode') === 'GuessThePrice'){
                            history.push('gtpgame')
                        }else if(localStorage.getItem('gameMode') === 'HighOrLow'){
                            history.push('higher-or-lower-game')
                        }else if(localStorage.getItem('gameMode') === 'MostExpensive'){
                            history.push('most-expensive-item')
                        }else{
                            if(parseInt(currentRound) % 3 === 1){
                                history.push('gtpgame')
                            }else if(parseInt(currentRound) % 3 === 2){
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
            <div className="demo">
                <div className="demo__colored-blocks">
                    <div className="demo__colored-blocks-rotater">
                        <div className="demo__colored-block"></div>
                        <div className="demo__colored-block"></div>
                        <div className="demo__colored-block"></div>
                    </div>
                    <div className="demo__colored-blocks-inner"></div>
                    <div className="demo__text">Ready</div>
                </div>
                <div className="demo__inner">
                    <svg className="demo__numbers" viewBox="0 0 100 100">
                        <defs>
                            <path className="demo__num-path-1" d="M40,28 55,22 55,78"/>
                            <path className="demo__num-join-1-2"
                                  d="M55,78 55,83 a17,17 0 1,0 34,0 a20,10 0 0,0 -20,-10"/>
                            <path className="demo__num-path-2"
                                  d="M69,73 l-35,0 l30,-30 a16,16 0 0,0 -22.6,-22.6 l-7,7"/>
                            <path className="demo__num-join-2-3" d="M28,69 Q25,44 34.4,27.4"/>
                            <path className="demo__num-path-3" d="M30,20 60,20 40,50 a18,15 0 1,1 -12,19"/>
                        </defs>
                        <path className="demo__numbers-path"
                              d="M-10,20 60,20 40,50 a18,15 0 1,1 -12,19
               Q25,44 34.4,27.4
               l7,-7 a16,16 0 0,1 22.6,22.6 l-30,30 l35,0 L69,73
               a20,10 0 0,1 20,10 a17,17 0 0,1 -34,0 L55,83
               l0,-61 L40,28"/>
                    </svg>
                </div>
            </div>
        </BaseContainer>
    );
}

export default GameLoadingBuffer;