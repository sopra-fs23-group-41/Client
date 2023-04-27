import {useCallback, useEffect, useState} from 'react';
import {api} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
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

const GTPGame = () => {
    // use react-router-dom's hook to access the history



    const gameId = localStorage.getItem('gameId');
    const isGm = localStorage.getItem('isGm');
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')

    //Boolean Flag
    const [onlyOnce, setOnlyOnce] = useState(true);


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



    const startNextRound = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextRound')
            console.log(request)
            console.log(request.data.picUrls)
            console.log(request.data.trueAnswer)
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            console.log(falseAnswers)
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0], request.data.falseAnswers[1], request.data.falseAnswers[2]])
            //setItems(request.data.articles);
        } catch (error) {
            console.log('Something went wrong, bro')
        }
    }, [gameId, setPicture, setTrueAnswer, setFalseAnswers, falseAnswers]);

    const getNextQuestion = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextQuestion')
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0], request.data.falseAnswers[1], request.data.falseAnswers[2]])
            //setItems(request.data.articles);
        } catch (error) {
            console.log('Something went wrong, sis')
        }
    }, [gameId, setPicture, setTrueAnswer, setFalseAnswers]);


    useEffect(() => {
        if(isGm === 'true' && onlyOnce) {
            setOnlyOnce(false);
            startNextRound();
            console.log(answers)
        }
    },[isGm, onlyOnce, startNextRound, answers]);



    useEffect(() => {
        if(isGm === 'false' && onlyOnce) {
            setOnlyOnce(false);
            getNextQuestion();
            console.log(answers)
        }
    },[isGm, onlyOnce, getNextQuestion, answers]);



    const pictureUrl = "https://"+picture[0]

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


    const playerAnswer = new Answer();
    //Boolean Flags that are used to create Effects on the Answer-Buttons
    const firstAnswer = () => {
        console.log(randomizedAnswers)
        setClicked(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = 10;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[0];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
    }

    const secondAnswer = () => {
        console.log(randomizedAnswers)
        setClicked2(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = 10;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[1];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
    }

    const thirdAnswer = () => {
        console.log(randomizedAnswers)
        setClicked3(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = 10;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[2];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
    }

    const forthAnswer = () => {
        console.log(randomizedAnswers)
        setClicked4(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = 10;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = randomizedAnswers[3];
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
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
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <Timer seconds={10}/>
            <img className="gtp item-pic" src={pictureUrl} alt="LOL"/>

            <div className="gtp answer-container">
                {clicked && (randomizedAnswers[0] === trueAnswer) && <h1>Your Guess is correct!</h1>}
                {clicked2 && (randomizedAnswers[1] === trueAnswer) && <h1>Your Guess is correct!</h1>}
                {clicked && (randomizedAnswers[0] !== trueAnswer) && <h1>Your Guess is wrong! Right answer: {trueAnswer} CHF</h1>}
                {clicked2 && (randomizedAnswers[1] !== trueAnswer) && <h1>Your Guess is wrong! Right answer: {trueAnswer} CHF</h1>}
                {!(clicked2 || clicked3 || clicked4) && <button

                    className="gtp answer-button"
                    onClick={firstAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked ? (trueAnswer === randomizedAnswers[0] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked ? '1.5' : '1', marginTop: clicked? '20px' : '0px', marginLeft: clicked ? (randomizedAnswers[0] !== trueAnswer ? '235px': '45px') : '0px'}}
                >
                    {randomizedAnswers[0]} CHF
                </button>}
                {!(clicked || clicked3 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={secondAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked2 ? (trueAnswer === randomizedAnswers[1] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked2 ? '1.5' : '1', marginTop: clicked2? '20px' : '0px', marginLeft: clicked2 ? (randomizedAnswers[1] === trueAnswer ? '45px': '235px') : '0px'}}
                >
                    {randomizedAnswers[1]} CHF
                </button>}

            </div>
            <div className="gtp answer-container">
                {clicked3 && (randomizedAnswers[2] === trueAnswer) && <h1>Your Guess is correct!</h1>}
                {clicked4 && (randomizedAnswers[3] === trueAnswer) && <h1>Your Guess is correct!</h1>}
                {clicked3 && (randomizedAnswers[2] !== trueAnswer) && <h1>Your Guess is wrong! Right answer: {trueAnswer} CHF</h1>}
                {clicked4 && (randomizedAnswers[3] !== trueAnswer) && <h1>Your Guess is wrong! Right answer: {trueAnswer} CHF</h1>}
                {!(clicked || clicked2 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={thirdAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                        style ={{backgroundColor: clicked3 ? (trueAnswer === randomizedAnswers[2] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked3 ? '1.5' : '1', marginTop: clicked3? '20px' : '0px', marginLeft: clicked3 ? (randomizedAnswers[2] === trueAnswer ? '45px': '235px') : '0px'}}
                >
                    {randomizedAnswers[2]} CHF
                </button>}
                {!(clicked || clicked3 || clicked2) && <button
                    className="gtp answer-button"
                    onClick={forthAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked4 ? (trueAnswer === randomizedAnswers[3] ? '#1ff11f' : '#ee3030') : 'floralwhite', scale: clicked4 ? '1.5' : '1', marginTop: clicked4? '20px' : '0px', marginLeft: clicked4 ? (randomizedAnswers[3] === trueAnswer ? '45px': '235px'): '0px'}}
                >
                    {randomizedAnswers[3]} CHF
                </button>}
            </div>



        </BaseContainer>
    );
}

export default GTPGame;
