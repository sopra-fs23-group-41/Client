import {useCallback, useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import "styles/views/HigherOrLowerGame.scss";

import '../pictures/2.jpg';
import guccishoe from '../pictures/guccishoe.png';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Timer from "../../helpers/Timer";
import Answer from "../../models/Answer";

const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};



const HigherOrLowerGame = () => {

    const history = useHistory();

    //const [users, setUsers] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);


    //Boolean Flags
    const [onlyOnce, setOnlyOnce] = useState(true);
    const [onlyOnce2, setOnlyOnce2] = useState(true);
    const [onlyOnce3, setOnlyOnce3] = useState(true);
    const [onlyOnce4, setOnlyOnce4] = useState(true);
    const [onlyOnce5, setOnlyOnce5] = useState(true);

    //Streak and Bonus Round Hooks
    const [isOnStreak, setIsOnStreak] = useState(false);
    const [isBonusRound, setIsBonusRound] = useState(false);


    const gameId = localStorage.getItem('gameId');
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')
    const rounds = localStorage.getItem('rounds')

    //Question-Data
    const [trueAnswer, setTrueAnswer] = useState(null);
    const [picture, setPicture] = useState(guccishoe);
    const [answers, setAnswers] = useState([0, 0]);
    const [prices, setPrices] = useState([0, 0]);

    //Used to avoid returning multiple answers to the Back-end
    if(onlyOnce3){
        setOnlyOnce3(false);
        localStorage.setItem('hasAnswered', 'false')
    }
    //Measure time
    const [startTime, setStartTime] = useState(null);

    if(onlyOnce2){
        setOnlyOnce2(false);
        setStartTime(Date.now())
    }

    const getNextQuestion = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextQuestion')
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0]])
            setPrices([request.data.articles[0].price, request.data.articles[1].price])
        } catch (error) {
            console.log('Something went wrong')
        }
    }, [gameId, setPicture, setTrueAnswer]);


    //Activate Streak Display
    useEffect(() => {
        if (onlyOnce5) {
            setOnlyOnce5(false);
            if (parseInt(localStorage.getItem('streak')) >= 3) {
                setIsOnStreak(true);
            }
        }
    }, [onlyOnce5])

    //Activate Bonus Round Display
    useEffect(() => {
        if (parseInt(currentRound) % 3 === 0) {
            setIsBonusRound(true);
        }
    }, [currentRound])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        const interval = setInterval(() => {
            async function hasEveryoneAnswered(gameId) {
                try {

                    // To check if the nextRound has been initialized
                    const allAnsweredCheck = await api.get('/lobbies/'+gameId+'/allAnswered');
                    const canBegin = allAnsweredCheck.data;
                    let currRound = parseInt(localStorage.getItem('currentRound'));
                    if (canBegin === true) {
                        if (currRound >= rounds) {
                            if(onlyOnce4){
                                history.push('endofgame');
                            }
                        }
                        else if(onlyOnce4){
                            setOnlyOnce4(false);
                            setTimeout(() => {
                                currRound = currRound + 1;
                                currRound = currRound.toString();
                                localStorage.setItem('currentRound', currRound);
                                history.push('leaderboard');
                            }, 2000);
                        }
                    }

                } catch (error) {
                    alert(`Something went wrong while fetching the game: \n${handleError(error)}`);
                }
            }
            hasEveryoneAnswered(gameId).catch((error) => {
                console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("An error occurred while executing the fetchData function! See the console for details.");
            });

        }, 1000);
        return () => clearInterval(interval);
    }, [gameId, currentRound, rounds, history, onlyOnce4]);



    useEffect(() => {
        if(onlyOnce) {
            setOnlyOnce(false);
            getNextQuestion();
        }
    },[onlyOnce, getNextQuestion, answers]);

    const pictureUrl1 = "https://"+picture[0]
    const pictureUrl2 = "https://"+picture[1]


    const playerAnswer = new Answer();
    //Boolean Flags that are used to create Effects on the Answer-Buttons
    const firstAnswer = () => {
        localStorage.setItem('hasAnswered', 'true')
        setClicked(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = (Date.now() - startTime)/1000;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = 'Higher';
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
        if('Higher' === trueAnswer){
            let currentStreak = parseInt(localStorage.getItem('streak'))
            currentStreak = currentStreak + 1;
            currentStreak = currentStreak.toString();
            localStorage.setItem('streak', currentStreak);
        }else{
            localStorage.setItem('streak', '0')
        }
    }

    const secondAnswer = () => {
        localStorage.setItem('hasAnswered', 'true')
        setClicked2(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = (Date.now() - startTime)/1000;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = 'Lower';
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
        if('Lower' === trueAnswer){
            let currentStreak = parseInt(localStorage.getItem('streak'))
            currentStreak = currentStreak + 1;
            currentStreak = currentStreak.toString();
            localStorage.setItem('streak', currentStreak);
        }else{
            localStorage.setItem('streak', '0')
        }
    }




    return (
        <BaseContainer className="multiplayer container">

            <div className="multiplayer navbar">
                <nav>
                    <ul className="nav__links">
                        <a className="multiplayer home-button-color" href="landing"><button className="multiplayer home-button">Home</button></a>
                    </ul>
                </nav>
                <h1 className="multiplayer title">Higher or Lower</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <div className="gtp bonus-and-streak">
                <h2>Round {currentRound}/ {rounds}</h2>
                {isBonusRound && <h2 className="gtp bonus">💰💹Bonus Round!💹💰</h2>}
                <Timer seconds={10}/>
            </div>
            {isOnStreak && <h2 className="gtp streak">🔥You're on a Streak of {localStorage.getItem('streak')} Rounds!🔥</h2>}


            <div className="h-or-l prices">
                <h1 className="h-or-l left-price">{prices[0]} USD</h1>
                {(clicked || clicked2) && <h1 className="h-or-l right-price">{prices[1]} USD</h1>
                }
            </div>


            <div className="h-or-l items">
                <img className="h-or-l item-pic" src={pictureUrl1} alt="LOL"/>
                <img className="h-or-l item-pic" src={pictureUrl2} alt="LOL"/>
            </div>

            <div className="gtp answer-container">

                {!(clicked2) && <button
                    className="gtp answer-button"
                    onClick={firstAnswer}
                    disabled={clicked || clicked2}
                    style ={{backgroundColor: clicked ? (trueAnswer === 'Higher' ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked ? '1.4' : '1', marginTop: clicked? '20px' : '0px', marginRight: clicked? '10px' : '0px', color: clicked? 'floralwhite' : '#8BA1FAFF'}}
                >
                    Higher
                </button>}
                {!(clicked) && <button
                    className="gtp answer-button"
                    onClick={secondAnswer}
                    disabled={clicked || clicked2}
                    style ={{backgroundColor: clicked2 ? (trueAnswer === 'Lower' ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked2 ? '1.4' : '1', marginTop: clicked2? '20px' : '0px', marginRight: clicked2? '10px' : '0px', color: clicked2? 'floralwhite' : '#8BA1FAFF'}}
                >
                    Lower
                </button>}
            </div>

        </BaseContainer>
    );
}

export default HigherOrLowerGame;
