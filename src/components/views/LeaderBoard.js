import {useCallback, useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
//import {useHistory} from 'react-router-dom';
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/MultiPlayer.scss";
import "styles/views/GTPGame.scss";
import '../pictures/2.jpg';
import logo from '../pictures/Logo.jpg';
import "helpers/Timer.js";
import Standings from "../../helpers/Standings";
import Timer from "../../helpers/TimerLeaderboard";
import "styles/ui/Standings.scss";
import Player from "../../models/Player";

function playerSort (players) {
    let temp;
    for(let i=0; i<players.length; i++){
        for(let j=0; j<players.length; j++){
            if(players[i].totalScore > players[j].totalScore){
                temp = players[j];
                players[j] = players[i];
                players[i] = temp;
            }
        }
    }
}

const LeaderBoard = () => {
    const [players, setPlayers] = useState([]);
    const [onlyOnce, setOnlyOnce] = useState(true);
    const gameId = localStorage.getItem('gameId');
    const rounds = localStorage.getItem('rounds');
    const currentRound = localStorage.getItem('currentRound')
    const isGm = localStorage.getItem('isGm')


    const startNextRound = useCallback(async () => {
        try {
            await api.get('/lobbies/' + gameId + '/nextRound')
            console.log("Next round has been initialized")
        } catch (error) {
            console.log(error.response.data.message)
        }
    }, [gameId]);

    useEffect(() => {
        if(isGm === 'true' && onlyOnce) {
            setOnlyOnce(false);
            startNextRound();
        }
    },[isGm, onlyOnce, startNextRound]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await api.get(`/lobbies/`+gameId);
                let temporaryPlayers = [];
                for(let i=0; i<response.data.players.length; i++){
                    const tempPlayer = new Player();
                    tempPlayer.playerName = response.data.players[i].playerName;
                    tempPlayer.roundScore = response.data.players[i].roundScore;
                    tempPlayer.totalScore = response.data.players[i].totalScore;
                    tempPlayer.profilePicture = response.data.players[i].profilePicture;
                    temporaryPlayers[i] = tempPlayer;
                }
                //const playersTemp = playersJson.map(playerJson => Player.fromJson(playerJson));
                playerSort(temporaryPlayers);
                setPlayers(temporaryPlayers);
            } catch (error) {
                console.error(`Something went wrong while fetching the players in leaderboard: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the players in leaderboard! See the console for details.");
            }
        };
        fetchPlayers().catch((error) => {
            console.error(`An error occurred while executing the fetchData function: \n${handleError(error)}`);
            console.error("Details:", error);
            alert("An error occurred while executing the fetchData function! See the console for details.");
        });
    }, [gameId]);

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
                <h1 className="multiplayer title">Current Standings</h1>
                <img className="multiplayer img" src={logo} alt="LOL"/>
            </div>

            <div className="gtp rounds" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <h2>Round {currentRound-1} / {rounds}</h2>
            </div>
            <h1 className="next-question-title">Next question starts in:</h1>
            <div className="next-question-timer">
                <Timer seconds={5}/>
            </div>
            <Standings players={players}/>


        </BaseContainer>
    );
}

export default LeaderBoard;