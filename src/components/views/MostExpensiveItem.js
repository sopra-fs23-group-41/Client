import {useCallback, useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
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



const MostExpensiveItem = () => {
    const [users, setUsers] = useState(null);
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);


    //Boolean Flags
    const [onlyOnce, setOnlyOnce] = useState(true);
    const [onlyOnce2, setOnlyOnce2] = useState(true);
    const [onlyOnce3, setOnlyOnce3] = useState(true);



    const gameId = localStorage.getItem('gameId');
    const isGm = localStorage.getItem('isGm');
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')
    const rounds = localStorage.getItem('rounds')

    //Question-Data
    const [trueAnswer, setTrueAnswer] = useState(null);
    const [falseAnswers, setFalseAnswers] = useState(0);
    const [picture, setPicture] = useState(guccishoe);
    const [answers, setAnswers] = useState([0, 0]);
    const [randomizedAnswers, setRandomizedAnswers] = useState([0, 0]);
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
    console.log(users)


    const startNextRound = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextRound')

            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0]])
            setPrices([request.data.articles[0].price, request.data.articles[1].price])
        } catch (error) {
            console.log('Something went wrong')
        }
    }, [gameId, setPicture, setTrueAnswer, setFalseAnswers]);

    const getNextQuestion = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextQuestion')
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            setAnswers([request.data.trueAnswer, request.data.falseAnswers[0]])
            setPrices([request.data.articles[0].price, request.data.articles[1].price])
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

    console.log(falseAnswers)


    useEffect(() => {
        if(isGm === 'false' && onlyOnce) {
            setOnlyOnce(false);
            getNextQuestion();
        }
    },[isGm, onlyOnce, getNextQuestion, answers]);

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
    }

    const secondAnswer = () => {
        localStorage.setItem('hasAnswered', 'true')
        console.log(randomizedAnswers)
        setClicked2(true);
        playerAnswer.playerId = playerId;
        playerAnswer.timeUsed = (Date.now() - startTime)/1000;
        playerAnswer.numOfRound = currentRound;
        playerAnswer.playerAnswer = 'Lower';
        api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
    }

    useEffect(() => {

        let randomAnswers = [0, 0];
        for (let i = 0; i < 2; i++) {
            randomAnswers[i] = answers[i]
        }

        setRandomizedAnswers(randomAnswers);
    }, [answers]);


    // the effect hook can be used to react to change in your component.
    // in this case, the effect hook is only run once, the first time the component is mounted
    // this can be achieved by leaving the second argument an empty array.
    // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html
    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api.get('/users');

                // delays continuous execution of an async operation for 1 second.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Get the returned users and update the state.
                setUsers(response.data);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    }, []);



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

            <div className="game-status-container">
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}><h2>Round {currentRound}/{rounds}</h2></div>
                <div> <Timer seconds={5} /> </div>
            </div>

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

export default MostExpensiveItem;
