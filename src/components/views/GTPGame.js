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
    const userId = localStorage.getItem('userId')

    const [onlyOnce, setOnlyOnce] = useState(true);




    //Interactive Button
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [clicked4, setClicked4] = useState(false);


    //Answer-Data
    /*
    const [playerId, setPlayerId] = useState(null);
    const [numOfRound, setNumOfRound] = useState(null);
    const [playerAnswer, setPlayerAnswer] = useState(null);
    const [timeUsed, setTimeUsed] = useState(null);
    const [question, setQuestion] = useState(null);
    */
    //const [playerId, setPlayerId] = useState(null);


    //whats wrong now wtf


    //Question-Data
    const [trueAnswer, setTrueAnswer] = useState(0);
    const [falseAnswers, setFalseAnswers] = useState([0, 0, 0]);
    const [picture, setPicture] = useState(guccishoe);




    const startNextRound = useCallback(async () => {
        try {
            const request = await api.get('/lobbies/' + gameId + '/nextRound')
            console.log(request)
            console.log(request.data.picUrls)
            console.log(request.data.trueAnswer)
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            //setItems(request.data.articles);
        } catch (error) {
            console.log('Something went wrong, bro')
        }
    }, [gameId, setPicture, setTrueAnswer, setFalseAnswers]);




    useEffect(() => {
        if(isGm === 'true' && onlyOnce){
            setOnlyOnce(false);
            startNextRound();
        }
    },[isGm, onlyOnce, startNextRound]);

    console.log(guccishoe)
    console.log(picture[0])

    const pictureUrl = "https://"+picture[0]
    //uff



    //Load Question from the Back-end
    /*async function getQuestion(){
        try{
            const request = await api.get('/lobbies/'+gameId+'/nextQuestion');
            console.log(request.data)
            setPicture(request.data.picUrls);
            setTrueAnswer(request.data.trueAnswer);
            setFalseAnswers(request.data.falseAnswers);
            setItems(request.data.articles);

        }catch(error){
            console.log('Something went wrong.')
        }

    }

    useEffect(()=>{
        getQuestion();
    });*/



    //Boolean Flags that are used to create Effects on the Answer-Buttons
    const firstAnswer = () => {
        setClicked(true);
        api.post('lobbies/'+gameId+'/player/'+userId+'/answered', trueAnswer)
    }

    const secondAnswer = () => {
        setClicked2(true);
        api.post('lobbies/'+gameId+'/player/'+userId+'/answered', trueAnswer)
    }

    const thirdAnswer = () => {
        setClicked3(true);
        api.post('lobbies/'+gameId+'/player/'+userId+'/answered', trueAnswer)
    }

    const forthAnswer = () => {
        setClicked4(true);
        api.post('lobbies/'+gameId+'/player/'+userId+'/answered', trueAnswer)
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
                {(clicked || clicked2) && <h1>Your Guess</h1>}
                {!(clicked2 || clicked3 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={firstAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked ? 'navajowhite' : 'floralwhite', scale: clicked ? '1.5' : '1', marginTop: clicked? '20px' : '0px'}}
                >
                    {trueAnswer} CHF
                </button>}
                {!(clicked || clicked3 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={secondAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked2 ? 'navajowhite' : 'floralwhite', scale: clicked2 ? '1.5' : '1', marginTop: clicked2? '20px' : '0px'}}
                >
                    {falseAnswers[0]} CHF
                </button>}

            </div>
            <div className="gtp answer-container">
                {(clicked3 || clicked4) && <h1>Your Guess</h1>}
                {!(clicked || clicked2 || clicked4) && <button
                    className="gtp answer-button"
                    onClick={thirdAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked3 ? 'navajowhite' : 'floralwhite', scale: clicked3 ? '1.5' : '1', marginTop: clicked3? '20px' : '0px'}}
                >
                    {falseAnswers[2]} CHF
                </button>}
                {!(clicked || clicked3 || clicked2) && <button
                    className="gtp answer-button"
                    onClick={forthAnswer}
                    disabled={clicked || clicked2 || clicked3 || clicked4}
                    style ={{backgroundColor: clicked4 ? 'navajowhite' : 'floralwhite', scale: clicked4 ? '1.5' : '1', marginTop: clicked4? '20px' : '0px'}}
                >
                    {falseAnswers[1]} CHF
                </button>}
            </div>



        </BaseContainer>
    );
}

export default GTPGame;
