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
import "styles/views/MostExpensiveItem.scss";


const Player = ({user}) => (
    <div className="player container">
        <div className="player username">{user.username}</div>
    </div>
);

Player.propTypes = {
    user: PropTypes.object
};



const MostExpensiveItem = () => {

    const history = useHistory();

    //Interactive Boolean Flags
    const [clicked, setClicked] = useState(false);
    const [blurPic1, setBlur1] = useState(false);
    const [blurPic2, setBlur2] = useState(false);
    const [blurPic3, setBlur3] = useState(false);
    const [blurPic4, setBlur4] = useState(false);



    //Boolean Flags
    const [onlyOnce, setOnlyOnce] = useState(true);
    const [onlyOnce2, setOnlyOnce2] = useState(true);
    const [onlyOnce3, setOnlyOnce3] = useState(true);
    const [onlyOnce4, setOnlyOnce4] = useState(true);
    const [onlyOnce5, setOnlyOnce5] = useState(true);


    //Streak and Bonus Round Hooks
    const [isOnStreak, setIsOnStreak] = useState(false);
    const [isBonusRound, setIsBonusRound] = useState(false);

    //Game and Player Information
    const gameId = localStorage.getItem('gameId');
    const playerId = localStorage.getItem('playerId')
    const currentRound = localStorage.getItem('currentRound')
    const rounds = localStorage.getItem('rounds')

    //Question-Data
    const [trueAnswer, setTrueAnswer] = useState(null);
    const [picture, setPicture] = useState(guccishoe);
    const [answers, setAnswers] = useState([0, 0]);
    const [price1, setPrice1] = useState(0);
    const [price2, setPrice2] = useState(0);
    const [price3, setPrice3] = useState(0);
    const [price4, setPrice4] = useState(0);

    const [brandName1, setBrandName1] = useState(null);
    const [brandName2, setBrandName2] = useState(null);
    const [brandName3, setBrandName3] = useState(null);
    const [brandName4, setBrandName4] = useState(null);
    const [productId1, setProductId1] = useState(null);
    const [productId2, setProductId2] = useState(null);
    const [productId3, setProductId3] = useState(null);
    const [productId4, setProductId4] = useState(null);




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
            setPrice1(request.data.articles[0].price)
            setPrice2(request.data.articles[1].price)
            setPrice3(request.data.articles[2].price)
            setPrice4(request.data.articles[3].price)
            setBrandName1(request.data.articles[0].brandName)
            setBrandName2(request.data.articles[1].brandName)
            setBrandName3(request.data.articles[2].brandName)
            setBrandName4(request.data.articles[3].brandName)
            setProductId1(request.data.articles[0].productId)
            setProductId2(request.data.articles[1].productId)
            setProductId3(request.data.articles[2].productId)
            setProductId4(request.data.articles[3].productId)
        } catch (error) {
            console.log('Something went wrong')
        }
    }, [gameId, setPicture, setTrueAnswer]);

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
                            history.push('endofgame');
                        }
                        else if(onlyOnce4){
                            setOnlyOnce4(false);
                            setTimeout(() => {
                                currRound = currRound + 1;
                                currRound = currRound.toString();
                                localStorage.setItem('currentRound', currRound);
                                history.push('leaderboard');
                            }, 4000);
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


    useEffect(() => {
        if(onlyOnce) {
            setOnlyOnce(false);
            getNextQuestion();
        }
    },[onlyOnce, getNextQuestion, answers]);

    const pictureUrl1 = "https://"+picture[0]
    const pictureUrl2 = "https://"+picture[1]
    const pictureUrl3 = "https://"+picture[2]
    const pictureUrl4 = "https://"+picture[3]



    const playerAnswer = new Answer();
    const handleAnswer = (choice) => {
        if(!clicked){
            localStorage.setItem('hasAnswered', 'true')
            setClicked(true);
            playerAnswer.playerId = playerId;
            playerAnswer.timeUsed = (Date.now() - startTime)/1000;
            playerAnswer.numOfRound = currentRound;
            if(choice === 1){
                playerAnswer.playerAnswer = productId1;
                setBlur2(true);
                setBlur3(true);
                setBlur4(true);
                if(productId1.toString() === trueAnswer){
                    let currentStreak = parseInt(localStorage.getItem('streak'))
                    currentStreak = currentStreak + 1;
                    currentStreak = currentStreak.toString();
                    localStorage.setItem('streak', currentStreak);
                }else{
                    localStorage.setItem('streak', '0')
                }
            }else if(choice === 2){
                playerAnswer.playerAnswer = productId2;
                setBlur1(true);
                setBlur3(true);
                setBlur4(true);
                if(productId2.toString() === trueAnswer){
                    let currentStreak = parseInt(localStorage.getItem('streak'))
                    currentStreak = currentStreak + 1;
                    currentStreak = currentStreak.toString();
                    localStorage.setItem('streak', currentStreak);
                }else{
                    localStorage.setItem('streak', '0')
                }
            }else if(choice === 3){
                playerAnswer.playerAnswer = productId3;
                setBlur1(true);
                setBlur2(true);
                setBlur4(true);
                if(productId3.toString() === trueAnswer){
                    let currentStreak = parseInt(localStorage.getItem('streak'))
                    currentStreak = currentStreak + 1;
                    currentStreak = currentStreak.toString();
                    localStorage.setItem('streak', currentStreak);
                }else{
                    localStorage.setItem('streak', '0')
                }
            }else{
                playerAnswer.playerAnswer = productId4;
                setBlur1(true);
                setBlur2(true);
                setBlur3(true);
                if(productId4.toString() === trueAnswer){
                    let currentStreak = parseInt(localStorage.getItem('streak'))
                    currentStreak = currentStreak + 1;
                    currentStreak = currentStreak.toString();
                    localStorage.setItem('streak', currentStreak);
                }else{
                    localStorage.setItem('streak', '0')
                }
            }
            api.post('lobbies/'+gameId+'/player/'+playerId+'/answered', playerAnswer)
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
                <h1 className="multiplayer title">Most Expensive Item</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>
            <div className="gtp bonus-and-streak">
                <h2>Round {currentRound}/ {rounds}</h2>
                {isBonusRound && <h2 className="gtp bonus">💰💹Bonus Round!💹💰</h2>}
                <Timer seconds={10}/>
            </div>
            {isOnStreak && <h2 className="gtp streak">🔥You're on a Streak of {localStorage.getItem('streak')} Rounds!🔥</h2>}



            <div className="most-expensive top-pics">
                <div className="most-expensive brand-and-pic">
                    <h1 className="most-expensive brandName" style={{opacity: blurPic1? 0.3 : 1}}>Brand: {brandName1}</h1>
                    {clicked && <h1 className="most-expensive brandName" style={{opacity: blurPic1? 0.3 : 1}}>Price: {price1} USD</h1>}
                    <img
                        className="most-expensive item-pic"
                        src={pictureUrl1}
                        alt="LOL"
                        onClick={() => handleAnswer(1)}
                        style={{opacity: blurPic1? 0.7 : 1, border: clicked? ((productId1.toString() === trueAnswer)? '10px solid #1FF11FFF' : '10px solid #EE3030FF'): '0px'}}
                    />
                </div>
                <div className="most-expensive brand-and-pic">
                    <h1 className="most-expensive brandName" style={{opacity: blurPic2? 0.3 : 1}}>Brand: {brandName2}</h1>
                    {clicked && <h1 className="most-expensive brandName" style={{opacity: blurPic2? 0.3 : 1}}>Price: {price2} USD</h1>}
                    <img
                        className="most-expensive item-pic"
                        src={pictureUrl2}
                        alt="LOL"
                        onClick={() => handleAnswer(2)}
                        style={{opacity: blurPic2? 0.7 : 1, border: clicked? ((productId2.toString() === trueAnswer)? '10px solid #1FF11FFF' : '10px solid #EE3030FF'): '0px'}}
                    />
                </div>
            </div>
            <div className="most-expensive bot-pics">
                <div className="most-expensive brand-and-pic">
                    <h1 className="most-expensive brandName" style={{opacity: blurPic3? 0.3 : 1}}>Brand: {brandName3}</h1>
                    {clicked && <h1 className="most-expensive brandName" style={{opacity: blurPic3? 0.3 : 1}}>Price: {price3} USD</h1>}
                    <img
                        className="most-expensive item-pic"
                        src={pictureUrl3}
                        alt="LOL"
                        onClick={() => handleAnswer(3)}
                        style={{opacity: blurPic3? 0.7 : 1, border: clicked? ((productId3.toString() === trueAnswer)? '10px solid #1FF11FFF' : '10px solid #EE3030FF'): '0px'}}
                    />
                </div>
                <div className="most-expensive brand-and-pic">
                    <h1 className="most-expensive brandName" style={{opacity: blurPic4? 0.3 : 1}}>{brandName4}</h1>
                    {clicked && <h1 className="most-expensive brandName" style={{opacity: blurPic4? 0.3 : 1}}>Price: {price4} USD</h1>}
                    <img
                        className="most-expensive item-pic"
                        src={pictureUrl4}
                        alt="LOL"
                        onClick={() => handleAnswer(4)}
                        style={{opacity: blurPic4? 0.7 : 1, border: clicked? ((productId4.toString() === trueAnswer)? '10px solid #1FF11FFF' : '10px solid #EE3030FF'): '0px'}}
                    />
                </div>
            </div>


        </BaseContainer>
    );
}

export default MostExpensiveItem;
