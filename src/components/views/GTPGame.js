import {useCallback, useEffect, useState} from 'react';
import {api} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import guccishoe from '../pictures/guccishoe.png';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Timer from "../../helpers/Timer";
import Answer from "../../models/Answer";


const GTPGame = () => {
    const gameId = localStorage.getItem('gameId');
    const isGm = localStorage.getItem('isGm');
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')
    const rounds = localStorage.getItem('rounds')

    //Boolean Flag
    const [onlyOnce, setOnlyOnce] = useState(true);
    const [onlyOnce2, setOnlyOnce2] = useState(true);
    const [onlyOnce3, setOnlyOnce3] = useState(true);

    const [isOnStreak, setIsOnStreak] = useState(false);
    const [isBonusRound, setIsBonusRound] = useState(false);

    //Interactive Button
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [clicked4, setClicked4] = useState(false);

    //Question-Data
    const [trueAnswer, setTrueAnswer] = useState(0);
    const [falseAnswers, setFalseAnswers] = useState([0, 0, 0]);
    const [picture, setPicture] = useState(guccishoe);
    const [answers, setAnswers] = useState([0, 0, 0, 0]);
    const [randomizedAnswers, setRandomizedAnswers] = useState([0, 0, 0, 0]);

    console.log(falseAnswers)

    //Measuring time
    const [startTime, setStartTime] = useState(null);

    //Load the next question if the player is the GM
    const startNextRound = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextRound')
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0], request.data.falseAnswers[1], request.data.falseAnswers[2]])
        } catch (error) {
            console.log('Something went wrong')
        }
    }, [gameId, setPicture, setTrueAnswer, setFalseAnswers]);


    //Load the next question if the player is not the GM
    const getNextQuestion = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextQuestion')
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0], request.data.falseAnswers[1], request.data.falseAnswers[2]])
        } catch (error) {
            console.log('Something went wrong')
        }
    }, [gameId, setPicture, setTrueAnswer, setFalseAnswers]);


    useEffect(() => {
        if(isGm === 'true' && onlyOnce) {
            setOnlyOnce(false);
            startNextRound();
        }
    },[isGm, onlyOnce, startNextRound, answers]);

    useEffect(() => {
        if(isGm === 'false' && onlyOnce) {
            setOnlyOnce(false);
            getNextQuestion();
        }
    },[isGm, onlyOnce, getNextQuestion, answers]);


    useEffect(() => {
        localStorage.setItem('hasAnswered', 'false')
    }, [])

    useEffect(() => {
        if (parseInt(currentRound) % 3 === 0) {
            setIsBonusRound(true);
        }
    }, [currentRound])

    useEffect(() => {
        if (onlyOnce2) {
            setOnlyOnce2(false);
            setStartTime(Date.now())
        }
    }, [onlyOnce2])

    useEffect(() => {
        if (onlyOnce3) {
            setOnlyOnce3(false);
            if (parseInt(localStorage.getItem('streak')) >= 3) {
                setIsOnStreak(true);
            }
        }
    }, [onlyOnce3])

    //Add https to the picture link
    const pictureUrl = "https://"+picture[0]


    //Randomize the answers regarding their position on the screen
    useEffect(() => {
        function getRandomInt(max) {
            return Math.floor(Math.random()*max);
        }

        let randomAnswers = [0, 0, 0, 0];
        var rand = getRandomInt(4);
        for (let i = 0; i < 4; i++) {
            randomAnswers[i] = answers[(i + rand)%4]
        }

        setRandomizedAnswers(randomAnswers);
    }, [answers]);


    //Handle the answer of a player
    const playerAnswer = new Answer();
    const firstAnswer = () => {
        localStorage.setItem('hasAnswered', 'true')
        setClicked(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = (Date.now() - startTime)/1000;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[0];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
        if(randomizedAnswers[0] === trueAnswer){
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
        playerAnswer.playerAnswer = randomizedAnswers[1];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
        if(randomizedAnswers[1] === trueAnswer){
            let currentStreak = parseInt(localStorage.getItem('streak'))
            currentStreak = currentStreak + 1;
            currentStreak = currentStreak.toString();
            localStorage.setItem('streak', currentStreak);
        }else{
            localStorage.setItem('streak', '0')
        }
    }

    const thirdAnswer = () => {
        localStorage.setItem('hasAnswered', 'true')
        setClicked3(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = (Date.now() - startTime)/1000;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[2];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
        if(randomizedAnswers[2] === trueAnswer){
            let currentStreak = parseInt(localStorage.getItem('streak'))
            currentStreak = currentStreak + 1;
            currentStreak = currentStreak.toString();
            localStorage.setItem('streak', currentStreak);
        }else{
            localStorage.setItem('streak', '0')
        }
    }

    const forthAnswer = () => {
        localStorage.setItem('hasAnswered', 'true')
        setClicked4(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = (Date.now() - startTime)/1000;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[3];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
        if(randomizedAnswers[3] === trueAnswer){
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
                <h1 className="multiplayer title">Guess The Price</h1>
                <img className="multiplayer img" src={logo} alt="broken"/>
            </div>

            <div className="gtp bonus-and-streak">
                <h2>Round {currentRound}/ {rounds}</h2>
                {isOnStreak && <h2 className="gtp streak">🔥🔥🔥You're on a Streak!🔥🔥🔥</h2>}
                {isBonusRound && <h2 className="gtp bonus">💰💹Bonus Round!💹💰</h2>}
                <Timer seconds={10}/>
            </div>

            <img className="gtp item-pic" src={pictureUrl} alt="broken"/>

            <div className="gtp answer-container">
                {clicked && (randomizedAnswers[0] === trueAnswer) && <h1 className="gtp reply">Right on the Money, baby!🤑</h1>}
                {clicked2 && (randomizedAnswers[1] === trueAnswer) && <h1 className="gtp reply">Right on the Money, baby!🤑</h1>}
                {clicked && (randomizedAnswers[0] !== trueAnswer) && (randomizedAnswers[0] < trueAnswer) && <h1 className="gtp reply">Hell nah, that's too cheap. Let's do {trueAnswer} CHF</h1>}
                {clicked && (randomizedAnswers[0] !== trueAnswer) && (randomizedAnswers[0] > trueAnswer) && <h1 className="gtp reply">You really wanna pay that much? I'd do {trueAnswer} CHF</h1>}
                {clicked2 && (randomizedAnswers[1] !== trueAnswer) && (randomizedAnswers[1] < trueAnswer) && <h1 className="gtp reply">Hell nah, that's too cheap. Let's do {trueAnswer} CHF</h1>}
                {clicked2 && (randomizedAnswers[1] !== trueAnswer) && (randomizedAnswers[1] > trueAnswer) && <h1 className="gtp reply">You really wanna pay that much? I'd do {trueAnswer} CHF</h1>}
                {!(clicked2 || clicked3 || clicked4) && <button

                    className="gtp answer-button"
                    onClick={firstAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked ? (trueAnswer === randomizedAnswers[0] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked ? '1.5' : '1', marginTop: clicked? '20px' : '0px', marginLeft: clicked ? (randomizedAnswers[0] !== trueAnswer ? (randomizedAnswers[0] < trueAnswer ? '185px' : '220px'): '80px') : '0px', color: clicked? 'floralwhite' : '#8BA1FAFF'}}
                >
                    {randomizedAnswers[0]} CHF
                </button>}
                {!(clicked || clicked3 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={secondAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked2 ? (trueAnswer === randomizedAnswers[1] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked2 ? '1.5' : '1', marginTop: clicked2? '20px' : '0px', marginLeft: clicked2 ? (randomizedAnswers[1] === trueAnswer ? '80px': (randomizedAnswers[1] < trueAnswer ? '185px' : '220px')) : '0px', color: clicked2? 'floralwhite' : '#8BA1FAFF'}}
                >
                    {randomizedAnswers[1]} CHF
                </button>}

            </div>
            <div className="gtp answer-container">
                {clicked3 && (randomizedAnswers[2] === trueAnswer) && <h1 className="gtp reply">Right on the Money, baby!🤑</h1>}
                {clicked4 && (randomizedAnswers[3] === trueAnswer) && <h1 className="gtp reply">Right on the Money, baby!🤑</h1>}
                {clicked3 && (randomizedAnswers[2] !== trueAnswer) && (randomizedAnswers[2] < trueAnswer) && <h1 className="gtp reply">Hell nah, that's too cheap. Let's do {trueAnswer} CHF</h1>}
                {clicked3 && (randomizedAnswers[2] !== trueAnswer) && (randomizedAnswers[2] > trueAnswer) && <h1 className="gtp reply">You really wanna pay that much? I'd do {trueAnswer} CHF</h1>}
                {clicked4 && (randomizedAnswers[3] !== trueAnswer) && (randomizedAnswers[3] < trueAnswer) && <h1 className="gtp reply">Hell nah, that's too cheap. Let's do {trueAnswer} CHF</h1>}
                {clicked4 && (randomizedAnswers[3] !== trueAnswer) && (randomizedAnswers[3] > trueAnswer) && <h1 className="gtp reply">You really wanna pay that much? I'd do {trueAnswer} CHF</h1>}
                {!(clicked || clicked2 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={thirdAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                        style ={{backgroundColor: clicked3 ? (trueAnswer === randomizedAnswers[2] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked3 ? '1.5' : '1', marginTop: clicked3? '20px' : '0px', marginLeft: clicked3 ? (randomizedAnswers[2] === trueAnswer ? '80px': (randomizedAnswers[2] < trueAnswer ? '185px' : '220px')) : '0px', color: clicked3? 'floralwhite' : '#8BA1FAFF'}}
                >
                    {randomizedAnswers[2]} CHF
                </button>}
                {!(clicked || clicked3 || clicked2) && <button
                    className="gtp answer-button"
                    onClick={forthAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked4 ? (trueAnswer === randomizedAnswers[3] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked4 ? '1.5' : '1', marginTop: clicked4? '20px' : '0px', marginLeft: clicked4 ? (randomizedAnswers[3] === trueAnswer ? '80px': (randomizedAnswers[3] < trueAnswer ? '185px' : '220px')): '0px', color: clicked4? 'floralwhite' : '#8BA1FAFF'}}
                >
                    {randomizedAnswers[3]} CHF
                </button>}
            </div>

        </BaseContainer>
    );
}

export default GTPGame;
